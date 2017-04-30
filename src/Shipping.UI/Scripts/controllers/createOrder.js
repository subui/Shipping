function createOrder($rootScope, $scope, request, $mdDialog, mdToast, order, userId) {
    $scope.isCreate = !order;
    $scope.isEdit = $scope.isCreate;
    if ($scope.isCreate) {
        $scope.title = constants.title.CREATE_ORDER;
    } else {
        $scope.title = constants.title.UPDATE_ORDER;
        $scope.order = JSON.parse(JSON.stringify(order));

        $scope.isWaiting = $scope.order.Status === $app.enums.orderStatus.Waiting;
        $scope.isShipping = $scope.order.Status === $app.enums.orderStatus.Shipping;
        $scope.isDone = $scope.order.Status === $app.enums.orderStatus.Done;
        $scope.isExpired = $scope.order.Status === $app.enums.orderStatus.Expired;
        $scope.isCanceled = $scope.order.Status === $app.enums.orderStatus.Canceled;
    }

    $scope.userId = userId;

    $scope.today = new Date();
    $scope.startTime = $scope.isCreate ? $scope.today : new Date($scope.order.StartTime);

    $scope.currentHour = $scope.startTime.getHours().toString().padStart(2, '0');
    $scope.currentMinute = $scope.startTime.getMinutes().toString().padStart(2, '0');

    $scope.today.setHours(0, 0, 0, 0);

    $scope.hours = [];
    for (var h = 0; h < 24; h++) {
        $scope.hours.push(h.toString().padStart(2, '0'));
    }

    $scope.minutes = [];
    for (var m = 0; m < 60; m++) {
        $scope.minutes.push(m.toString().padStart(2, '0'));
    }

    $scope.edit = function () {
        $scope.isEdit = !$scope.isEdit;
        $scope.orderOld = JSON.parse(JSON.stringify($scope.order));
    };

    $scope.cancel = function () {
        $scope.isEdit = !$scope.isEdit;
        $scope.order = $scope.orderOld;
    };

    $scope.save = function () {
        if (!$scope.createOrder.$valid) return;
        $scope.waiting = true;

        $scope.startTime.setHours($scope.hour, $scope.minute);
        $scope.order.StartTime = $scope.startTime;

        if ($scope.isCreate) {
            $scope.order.ShopId = $scope.userId;
            $scope.order.Status = $app.enums.orderStatus.Waiting;

            request.createOrder($scope.order, onSuccess, onError);
        } else {
            if ($scope.isExpired && $scope.startTime.getTime() > Date.now())
                $scope.order.Status = $app.enums.orderStatus.Waiting;

            request.updateOrder($scope.order, onSuccess, onError);
        }
    };

    $scope.done = function () {
        $scope.order.Status = $app.enums.orderStatus.Done;
        request.updateOrder($scope.order, onSuccess, onError);
    };

    $scope.cancelOrder = function () {
        $scope.order.Status = $app.enums.orderStatus.Canceled;
        request.updateOrder($scope.order, onSuccess, onError);
    };

    $scope.closeDialog = function () {
        // Show confirm dialog
        $mdDialog.cancel();
    };

    function onSuccess(response) {
        $scope.waiting = false;

        var status = $app.enums.responseStatus;
        var type = $app.enums.requestType;

        if (response.data.RequestType === type.Order) {
            if (response.data.ResponseStatus === status.Success) {
                var message = constants.lbl.CREATE_ORDER_SUCCESS;
                if (!$scope.isCreate) {
                    message = constants.lbl.UPDATE_ORDER_SUCCESS;
                    $scope.isEdit = false;

                    $rootScope.$broadcast('createOrUpdateOrder');
                } else {
                    $mdDialog.hide();
                }

                mdToast.showToastTemplate(String.format(message, $scope.order.OrderName), 0, 'bottom right');
            }
        }
    }

    function onError(response) {
        $scope.waiting = false;
        mdToast.showToast(constants.lbl.ERROR, 0, 'top right');
        console.error(response.data);
    }
}