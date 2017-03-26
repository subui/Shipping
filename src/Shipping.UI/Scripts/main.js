function main($scope, $timeout, $mdSidenav, $mdDialog, $mdToast) {
    $scope.openSidenav = buildToggler('left');
    $scope.username = '111';

    $scope.showDetail = function (e) {
        $mdDialog.show({
            controller: dialogController,
            templateUrl: '../Templates/order-detail.html',
            parent: angular.element(document.body),
            targetEvent: e,
            clickOutsideToClose: true,
            fullscreen: true
        })
        .then(function () {
            showToast();
        }, function () {

        });
    };

    $scope.create = function (e) {
        $app.loadScript('/Scripts/createOrder.js');
        $mdSidenav('left').toggle();
        $timeout(function () {
            $mdDialog.show({
                controller: dialogController,
                templateUrl: 'create-order.html',
                parent: angular.element(document.body),
                targetEvent: e,
                clickOutsideToClose: true,
                fullscreen: true
            })
                .then(function () {
                    showToast();
                },
                function () {

                });
        }, 0);
    };

    $scope.openMenu = function($mdMenu, e) {
        $mdMenu.open(e);
    };

    function showToast() {
        $mdToast.show(
            $mdToast.simple()
                .textContent('Simple Toast')
                .hideDelay(3000)
                .position('bottom right')
        );
    };

    function buildToggler(componentId) {
        return function () {
            $mdSidenav(componentId).toggle();
        };
    };

    function dialogController($scope, $mdDialog) {
        $scope.hide = function () {
            $mdDialog.hide();
        };

        $scope.closeDialog = function () {
            $mdDialog.cancel();
        };

        $scope.register = function () {
            $mdDialog.hide();
        };
    }
}
