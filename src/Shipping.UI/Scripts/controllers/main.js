function main($scope, request, $window, $mdSidenav, $mdDialog, mdToast, cookies) {
    $scope.isLogin = false;
    $scope.userLogin = cookies.getUserLogin();
    if ($scope.userLogin) {
        $scope.isLogin = true;
        $scope.userId = $scope.userLogin.UserId;
        $scope.username = $scope.userLogin.FullName;
        $scope.isShopManager = $scope.userLogin.UserType === $app.enums.userType.ShopManager;
        $scope.content = 'list-orders.html';
    } else {
        $window.location.href = '/account/login.html';
        return;
    }

    $scope.setTitle = function (title) {
        $scope.title = title;
    }
    $scope.menu = [];

    $scope.isShopManager
            ? $scope.menu.push({
                title: constants.btn.ORDER_MANAGEMENT,
                children: [
                    {
                        title: constants.btn.MY_ORDERS,
                        action: function () {
                            $scope.menu.highlight = this.title;
                            $scope.showListOrders();
                        }
                    },
                    {
                        title: constants.btn.CREATE_ORDER,
                        action: function () {
                            $scope.createOrder();
                            $scope.menu.highlight = this.title;
                        }
                    }
                ]
            })
            : $scope.menu.push({
                title: constants.btn.ORDER_MANAGEMENT,
                children: [
                    {
                        title: constants.btn.LIST_ORDERS,
                        action: function () {
                            $scope.menu.highlight = this.title;
                            $scope.getOrders();
                        }
                    },
                    {
                        title: constants.btn.ORDER_REGISTERED,
                        action: function () {
                            $scope.menu.highlight = this.title;
                            $scope.getOrdersRegistered();
                        }
                    }
                ]
            });

    $scope.menu.push({
        title: constants.btn.ACCOUNT_MANAGEMENT,
        children: [
            {
                title: constants.btn.PROFILE,
                action: function () {
                    $scope.menu.highlight = this.title;
                    $scope.showProfile();
                }
            },
            {
                title: constants.btn.CHANGE_PASSWORD,
                action: function () {
                    $scope.menu.highlight = this.title;
                    $scope.changePassword();
                }
            }
        ]
    });

    $scope.menu.push({
        title: constants.btn.LOGOUT,
        action: function () {
            $scope.logout();
        }
    });

    $scope.menu.highlight = $scope.menu[0].children[0].title;

    $scope.menu.isActive = function (item) {
        return item === this.highlight;
    };

    $scope.showListOrders = function () {
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
        $app.loadScript('/Scripts/controllers/createOrder.js', null, function() {
            if (!order) {
                $mdSidenav('left').toggle();
                $scope.menu.highlightPre = $scope.menu.highlight;
            }

            $mdDialog.show({
                targetEvent: event,
                templateUrl: 'create-order.html',
                controller: 'createOrder',
                locals: {
                    order: order,
                    userId: $scope.userId
                }
            }).then(function () {
                $scope.$broadcast('createOrUpdateOrder');
                if (!order) {
                    $scope.content = 'list-orders.html';
                    $scope.menu.highlight = $scope.menu[0].children[0].title;
                }
            }, function () {
                if (!order) {
                    $scope.menu.highlight = $scope.menu.highlightPre;
                }
            });
        });
    };

    $scope.showProfile = function () {
        $app.loadScript('/Scripts/controllers/profile.js', null, function () {
            $scope.content = 'profile.html';
            $scope.toggleSidenav();
        });
    };

    $scope.changePassword = function () {
        $app.loadScript('/Scripts/controllers/changePassword.js', null, function() {
            $scope.content = 'change-password.html';
            $scope.toggleSidenav();
        });
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
