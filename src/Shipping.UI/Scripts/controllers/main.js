function main($rootScope, $scope, request, $window, $timeout, $mdSidenav, $mdDialog, mdToast, cookies) {
    $scope.isLogin = false;
    $scope.userLogin = cookies.getUserLogin();
    if ($scope.userLogin) {
        $scope.isLogin = true;
        $scope.username = $scope.userLogin.FullName;
    } else {
        $window.location.href = '/account/login.html';
        return;
    }
    $scope.waiting = true;
    request.getListOrders(onSuccess, onError);

    $scope.menu = [];

    $scope.menu.push({
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
            $scope.createOrder();
            return;
        }

        $mdDialog.show({
            controller: function ($scope, $mdDialog) {
                $scope.order = order;
                $scope.closeDialog = function () {
                    $mdDialog.cancel();
                };

                $scope.register = function () {
                    $mdDialog.hide();
                };
            },
            templateUrl: '/Templates/order-detail.html',
            parent: angular.element(document.body),
            targetEvent: event,
            clickOutsideToClose: true
        })
        .then(function () {
            mdToast.showToast('Simple Toast', 3000, 'bottom right');
        }, function () {
        });
    };

    $scope.createOrder = function (event, order) {
        if (!order) $mdSidenav('left').toggle();

        $mdDialog.show({
//            parent: angular.element(document.body),
            targetEvent: event,
            templateUrl: 'create-order.html',
            fullscreen: true,
            controller: createOrder,
            locals: {
                order: order
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
