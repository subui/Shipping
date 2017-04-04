function createOrder($scope, $mdDialog) {
    $scope.mdDialog = $mdDialog;
    $scope.save = function() {
        if (!$scope.createOrder.$valid) return;
        $scope.waiting = true;
    };

    $scope.cancel = function(event) {
        // Show confirm dialog
    };
}