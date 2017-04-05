function createOrder($scope, $mdDialog) {
    $scope.mdDialog = $mdDialog;
    $scope.save = function () {
        if (!$scope.createOrder.$valid) return;
        $scope.waiting = true;
        var order = new $app.entities.Order();
        order.OrderName = $scope.orderName;
        order.StartingPoint = $scope.startingPoint;
        order.Destination = $scope.destination;
        order.StartTime = $scope.startTime;
        order.RecipientsName = $scope.recipientsName;
        order.RecipientsPhoneNumber = $scope.recipientsOhoneNumber;
        order.AdvanceDeposit = $scope.advanceDeposit;
        order.Profit = $scope.profit;
        $app.request.createOrder(order, onSuccess, onError);
    };

    $scope.cancel = function () {
        // Show confirm dialog
        $scope.$parent.mdDialog.cancel();
    };
}