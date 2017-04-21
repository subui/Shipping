function main($rootScope, $scope, request, $window, $timeout, $mdSidenav, $mdDialog, mdToast, cookies) {
    $scope.isLogin = false;
    $scope.userLogin = cookies.getUserLogin();
    if ($scope.userLogin) {
        $scope.isLogin = true;
        $scope.userId = $scope.userLogin.UserId;
        $scope.username = $scope.userLogin.FullName;
    } else {
        $window.location.href = '/account/login.html';
        return;
    }
    $scope.waiting = true;
    request.getListOrders(onSuccess, onError);

    $scope.menu = [];

    $scope.userLogin.UserType === $app.enums.userType.ShopManager
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
                        title: $rootScope.consts.btn.LIST_ORDERS
                    },
                    {
                        title: $rootScope.consts.btn.ORDER_REGISTERED,
                        action: function () {
                            $scope.createOrder();
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

    $scope.rm = function () {
        var content = document.getElementById('content');
        content.children[0].remove();
    }

    $scope.showDetail = function (event, order) {
        if ($scope.userLogin.UserType === $app.enums.userType.ShopManager) {
            $scope.createOrder(event, order);
            return;
        }

        $mdDialog.show({
//            parent: angular.element(document.body),
            targetEvent: event,
            templateUrl: '/Templates/order-detail.html',
            clickOutsideToClose: true,
            controller: orderDetail,
            locals: {
                order: order,
                userId: $scope.userId
    }
        })
        .then(function () {
            mdToast.showToast('dang ky thanh cong', 3000, 'bottom right');
        }, function () {
        });
    };

    $scope.createOrder = function (event, order) {
        if (!order) $mdSidenav('left').toggle();

        $mdDialog.show({
//            parent: angular.element(document.body),
            targetEvent: event,
            templateUrl: 'create-order.html',
            controller: createOrder,
            locals: {
                order: order,
                userId: $scope.userId
    }
        }).then(function () {
            mdToast.showToast('Simple Toast', 3000, 'bottom right');
        }, function () {

        });
    };

    $scope.logout = function () {
        cookies.userLogout();
        $window.location.href = '/';
    };

    $scope.openSidenav = function () {
        $mdSidenav('left').toggle();
    };

    $scope.openMenu = function ($mdMenu, e) {
        $mdMenu.open(e);
    };

    function onSuccess(response) {
        $scope.waiting = false;
        $scope.orders = response.data;
    }

    function onError(response) {
        $scope.waiting = false;
        mdToast.showToast('An error has occurred.', 3000, 'bottom right');
        console.log(response.data);
    }
}
