function createOrder($scope, request, $mdDialog, mdToast, order, userId) {
    $scope.isCreate = !order;
    $scope.isEdit = $scope.isCreate;
    $scope.order = JSON.parse(JSON.stringify(order));
    $scope.userId = userId;
    
    $scope.today = new Date();
    $scope.startTime = new Date($scope.order.StartTime);
    if ($scope.isCreate) {
        $scope.currentHour = $scope.today.getHours();
        $scope.currentMinute = $scope.today.getMinutes();
    } else {
        $scope.currentHour = $scope.startTime.getHours();
        $scope.currentMinute = $scope.startTime.getMinutes();
    }

    $scope.currentHour = $scope.currentHour.toString().padStart(2, '0');
    $scope.currentMinute = $scope.currentMinute.toString().padStart(2, '0');

    $scope.today.setHours(0, 0, 0, 0);

    $scope.hours = [];
    for (var h = 0; h < 24; h++) {
        $scope.hours.push(h.toString().padStart(2, '0'));
    }

    $scope.minutes = [];
    for (var m = 0; m < 60; m++) {
        $scope.minutes.push(m.toString().padStart(2, '0'));
    }

    $scope.mdDialog = $mdDialog;

    $scope.edit = function () {
        $scope.isEdit = !$scope.isEdit;
        $scope.orderOld = JSON.parse(JSON.stringify($scope.order));
    }

    $scope.cancel = function() {
        $scope.isEdit = !$scope.isEdit;
        $scope.order = $scope.orderOld;
    }

    $scope.save = function () {
        if (!$scope.createOrder.$valid) return;
        $scope.waiting = true;

        $scope.order.ShopId = $scope.userId;
        $scope.startTime.setHours($scope.hour, $scope.minute);
        $scope.order.StartTime = $scope.startTime;

        console.log($scope.order);
        $scope.isCreate ? request.createOrder($scope.order, onSuccess, onError)
                        : request.updateOrder($scope.order, onSuccess, onError);
    };

    $scope.closeDialog = function () {
        // Show confirm dialog
        $scope.mdDialog.cancel();
    };

    function onSuccess(response) {
        $scope.waiting = false;
        var status = $app.enums.responseStatus;
        if (response.data === status.Success) {
            mdToast.showToast('tao moi thanh cong', 0, 'top right');
            if (!$scope.isCreate) {
                for (var key in $scope.order) {
                    if ($scope.order.hasOwnProperty(key)) {
                        order[key] = $scope.order[key];
                    }
                }
            }
        }
    }

    function onError(response) {
        $scope.waiting = false;
        mdToast.showToast('An error has occurred.', 0, 'top right');
        console.error(response.data);
    }
}