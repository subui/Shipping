function main($rootScope, $scope, request, $window, $timeout, $mdSidenav, $mdDialog, mdToast, cookies) {
    $scope.isLogin = false;
    if (cookies.getUserLogin()) {
        $scope.username = cookies.getUserLogin();
        $scope.isLogin = true;
    } else {
        $window.location.href = '/account/login.html';
        return;
    }
    $scope.orders = request.getListOrders(onSuccess, onError);
    $scope.orders = [new $app.entities.Order()];

    $scope.showDetail = function (e, order) {
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
            targetEvent: e,
            clickOutsideToClose: true,
            fullscreen: true
        })
        .then(function () {
            mdToast.showToast('Simple Toast', 3000, 'bottom right');
        }, function () {

        });
    };

    $scope.create = function (e) {
        $app.loadScript('/Scripts/createOrder.js');
        $mdSidenav('left').toggle();

        $timeout(function () {
            $mdDialog.show({
                controller: function() {
                    
                },
                templateUrl: 'create-order.html',
                parent: angular.element(document.body),
                targetEvent: e,
                clickOutsideToClose: true,
                fullscreen: true
            }).then(function () {
                mdToast.showToast('Simple Toast', 3000, 'bottom right');
            }, function () {

            });
        }, 0);
    };

    $scope.logout = function() {
        cookies.userLogout();
        $window.location.href = '/';
    };

    $scope.openSidenav = function() {
        $mdSidenav('left').toggle();
    };

    $scope.openMenu = function ($mdMenu, e) {
        $mdMenu.open(e);
    };

    function onSuccess(response) {
        
    }

    function onError(response) {
        
    }
}
