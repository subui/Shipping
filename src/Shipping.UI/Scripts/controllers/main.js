function main($rootScope, $scope, request, $window, $timeout, $mdSidenav, $mdDialog, mdToast, cookies) {
    $scope.isLogin = false;
    $scope.userLogin = cookies.getUserLogin();
    if ($scope.userLogin) {
        $scope.isLogin = true;
        $scope.userId = $scope.userLogin.UserId;
        $scope.username = $scope.userLogin.FullName;
        $scope.isShopManager = $scope.userLogin.UserType === $app.enums.userType.ShopManager;
    } else {
        $window.location.href = '/account/login.html';
        return;
    }

    $scope.waiting = true;
    request.getListOrdersByUserId($scope.userId, onSuccess, onError);
    
    $scope.menu = [];

    $scope.isShopManager
            ? $scope.menu.push({
                title: $rootScope.consts.btn.ORDER_MANAGEMENT,
                children: [
                    {
                        title: $rootScope.consts.btn.MY_ORDERS
                    },
                    {
                        title: $rootScope.consts.btn.CREATE_ORDER,
                        action: function() {
                            $scope.createOrder();
                        }
                    }
                ]
            })
            : $scope.menu.push({
                title: $rootScope.consts.btn.ORDER_MANAGEMENT,
                children: [
                    {
                        title: $rootScope.consts.btn.LIST_ORDERS,
                        action: function() {
                            $scope.getOrders();
                        }
                    },
                    {
                        title: $rootScope.consts.btn.ORDER_REGISTERED,
                        action: function () {
                            $scope.getOrdersRegistered();
                        }
                    }
                ]
            });

    $scope.menu.push({
        title: $rootScope.consts.btn.ACCOUNT_MANAGEMENT,
        children: [
            {
                title: $rootScope.consts.btn.PROFILE
            },
            {
                title: $rootScope.consts.btn.CHANGE_PASSWORD,
                action: function() {
                    $scope.createOrder();
                }
            }
        ]
    });

    $scope.menu.push({
        title: $rootScope.consts.btn.LOGOUT,
        action: function() {
            $scope.logout();
        }
    });

    $scope.rm = function() {
        var content = document.getElementById('content');
        content.children[0].remove();
    };

    $scope.getOrders = function () {
        $scope.orders = $scope.listOrdersNotRegistered;
        $scope.isRegistered = false;
        $scope.toggleSidenav();
    };

    $scope.showDetail = function (event, order) {
        if ($scope.userLogin.UserType === $app.enums.userType.ShopManager) {
            $scope.createOrder(event, order);
            return;
        }

        $mdDialog.show({
//            parent: angular.element(document.body),
            targetEvent: event,
            templateUrl: 'order-detail.html',
            clickOutsideToClose: true,
            controller: 'orderDetail',
            locals: {
                order: order,
                userId: $scope.userId,
                isRegistered: $scope.isRegistered
            }
        })
        .then(function () {
            var message;
            var index;

            if ($scope.isRegistered) {
                message = constants.lbl.UNREGISTER_ORDER_SUCCESS;
                index = $scope.listOrdersRegistered.indexOf(order);
                $scope.listOrdersRegistered.splice(index, 1);

                $scope.listOrdersNotRegistered.push(order);
                $scope.listOrdersNotRegistered.sort((o1, o2) => o1.OrderId - o2.OrderId);
            } else {
                message = constants.lbl.REGISTER_ORDER_SUCCESS;
                index = $scope.listOrdersNotRegistered.indexOf(order);
                $scope.listOrdersNotRegistered.splice(index, 1);

                $scope.listOrdersRegistered.push(order);
                $scope.listOrdersRegistered.sort((o1, o2) => o1.OrderId - o2.OrderId);
            }
            mdToast.showToast(String.format(message, order.OrderName), 3000, 'bottom right');
        }, function () {
        });
    };

    $scope.createOrder = function (event, order) {
        if (!order) $mdSidenav('left').toggle();

        $mdDialog.show({
//            parent: angular.element(document.body),
            targetEvent: event,
            templateUrl: 'create-order.html',
            controller: 'createOrder',
            locals: {
                order: order,
                userId: $scope.userId
            }
        }).then(function () {
            request.getListOrdersByUserId($scope.userId, onSuccess, onError);
        }, function () {

        });
    };

    $scope.showShipper = function (event, order) {
        event.stopPropagation();
        $mdDialog.show({
            targetEvent: event,
            templateUrl: 'select-shipper.html',
            clickOutsideToClose: true,
            controller: 'selectShipper',
            locals: {
                order: order,
                userId: $scope.userId,
                isRegistered: $scope.isRegistered
            }
        });
    };

    $scope.getOrdersRegistered = function () {
        $scope.orders = $scope.listOrdersRegistered;
        $scope.isRegistered = true;
        $scope.toggleSidenav();
    };

    $scope.logout = function () {
        cookies.userLogout();
        $window.location.href = '/';
    };

    $scope.toggleSidenav = function () {
        $mdSidenav('left').toggle();
    };

    $scope.openMenu = function ($mdMenu, e) {
        $mdMenu.open(e);
    };

    function onSuccess(response) {
        $scope.waiting = false;

        var status = $app.enums.responseStatus;
        var type = $app.enums.requestType;

        if (response.data.RequestType === type.Order && response.data.ResponseStatus === status.Success) {
            $scope.listOrders = response.data.Data;
            $scope.orders = $scope.listOrders;
            if ($scope.isShopManager) {
                $scope.orders.forEach(order => order.ShipperCount = String.format(constants.btn.LIST_SHIPPER_REGISTERED, order.ShipperCount));
            } else {
                request.getOrderRegisteredByShipperId($scope.userId, onSuccess, onError);
            }

        }

        if (response.data.RequestType === type.Register && response.data.ResponseStatus === status.Success) {
            $scope.listOrdersRegistered = response.data.Data;
            $scope.listOrdersNotRegistered = [];

            $scope.listOrders.filter(order => {
                var isRegistered = $scope.listOrdersRegistered.some(o => o.OrderId === order.Order.OrderId);
                if (!isRegistered) {
                    $scope.listOrdersNotRegistered.push(order.Order);
                }
            });

            $scope.orders = $scope.listOrdersNotRegistered;
        }
    }

    function onError(response) {
        $scope.waiting = false;
        mdToast.showToast(constants.lbl.ERROR, 3000, 'bottom right');
        console.error(response.data);
    }
}
