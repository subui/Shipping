function createOrder($scope, request, $mdDialog, mdToast) {
    $scope.today = new Date();
    $scope.startTime = new Date();

    $scope.hours = [];
    for (var h = 0; h <= 24; h++) {
        $scope.hours.push(h < 10 ? '0' + h : h.toString());
    }

    $scope.minutes = [];
    for (var m = 0; m <= 60; m++) {
        $scope.minutes.push(m < 10 ? '0' + m : m.toString());
    }

    $scope.mdDialog = $mdDialog;
    $scope.save = function () {
        if (!$scope.createOrder.$valid) return;
        $scope.waiting = true;

        $scope.startTime.setHours($scope.hour);
        $scope.startTime.setMinutes($scope.minute);
        $scope.startTime.setSeconds(0);

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

    $scope.cancel = function () {
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