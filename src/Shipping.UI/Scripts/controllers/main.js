function main($rootScope, $scope, request, $window, $timeout, $mdSidenav, $mdDialog, mdToast, cookies) {
    $scope.isLogin = false;
    $scope.username = cookies.getUserLogin();
    if ($scope.username) {
        $scope.isLogin = true;
    } else {
        $window.location.href = '/account/login.html';
        return;
    }
    $scope.orders = request.getListOrders(onSuccess, onError);
    $scope.rm = function () {
        var content = document.getElementById('content');
        content.children[0].remove();
    }

    $scope.showDetail = function (event, order) {
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

    $scope.createOrder = function (event) {
        $app.loadScript('/Scripts/controllers/createOrder.js');
        $mdSidenav('left').toggle();

        $timeout(function () {
            $mdDialog.show({
                parent: angular.element(document.body),
                targetEvent: event,
                templateUrl: 'create-order.html',
                fullscreen: true,
                controller: createOrder
            }).then(function () {
                mdToast.showToast('Simple Toast', 3000, 'bottom right');
            }, function () {

            });
        }, 100);
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

    }

    function onError(response) {

    }
}
