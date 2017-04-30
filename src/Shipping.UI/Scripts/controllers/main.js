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

    $scope.menu = [];

    $scope.isShopManager
            ? $scope.menu.push({
                title: $rootScope.consts.btn.ORDER_MANAGEMENT,
                children: [
                    {
                        title: $rootScope.consts.btn.MY_ORDERS,
                        action: function() {
                            $scope.showListOrders();
                        }
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
                title: $rootScope.consts.btn.PROFILE,
                action: function() {
                    $scope.showProfile();
                }
            },
            {
                title: $rootScope.consts.btn.CHANGE_PASSWORD,
                action: function() {
                    $scope.changePassword();
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

    $scope.showListOrders = function() {
        $scope.content = 'list-orders.html';
        $scope.toggleSidenav();
    };

    $scope.getOrders = function () {
        $scope.content = 'list-orders.html';
        $scope.$broadcast('getOrders');
        $scope.toggleSidenav();
    };

    $scope.getOrdersRegistered = function () {
        $scope.content = 'list-orders.html';
        $scope.$broadcast('getOrdersRegistered');
        $scope.toggleSidenav();
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
            $scope.$broadcast('createOrUpdateOrder');
        }, function () {
            
        });
    };

    $scope.showProfile = function() {
        $scope.content = 'profile.html';
        $scope.toggleSidenav();
    };

    $scope.changePassword = function() {
        $scope.content = 'change-password.html';
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
}
