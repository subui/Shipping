function createOrder($scope, request, $mdDialog, mdToast, order) {
    if ($scope.isCreate === undefined) $scope.isCreate = !order;
    if ($scope.order === undefined) $scope.order = $scope.isCreate ? $scope.$parent.order : order;
    
    $scope.today = new Date();
    $scope.currentHour = $scope.today.getHours().toString().padStart(2, '0');
    $scope.currentMinute = $scope.today.getMinutes().toString().padStart(2, '0');

    $scope.today.setHours(0, 0, 0, 0);

    $scope.hours = [];
    for (var h = 0; h <= 24; h++) {
        $scope.hours.push(h.toString().padStart(2, '0'));
    }

    $scope.minutes = [];
    for (var m = 0; m <= 60; m++) {
        $scope.minutes.push(m.toString().padStart(2, '0'));
    }

    $scope.mdDialog = $mdDialog;
    $scope.save = function () {
        if (!$scope.createOrder.$valid) return;
        $scope.waiting = true;

        $scope.startTime.setHours($scope.hour, $scope.minute);

        var order = new $app.entities.Order();
        order.OrderName = $scope.orderName;
        order.StartingPoint = $scope.startingPoint;
        order.Destination = $scope.destination;
        order.StartTime = $scope.startTime;
        order.RecipientsName = $scope.recipientsName;
        order.RecipientsPhoneNumber = $scope.recipientsPhoneNumber;
        order.AdvanceDeposit = $scope.advanceDeposit;
        order.Profit = $scope.profit;
        request.createOrder(order, onSuccess, onError);
    };

    $scope.closeDialog = function () {
        // Show confirm dialog
        $scope.$parent.mdDialog.cancel();
    };

    function onSuccess(response) {
        $scope.waiting = false;
        var status = $app.responseStatus;
        if (response.data === status.Success) {
            mdToast.showToast('tao moi thanh cong', 0, 'top right');
        }
    }

    function onError(response) {
        $scope.waiting = false;
        mdToast.showToast('An error has occurred.', 0, 'top right');
        console.error(response.data);
    }
}