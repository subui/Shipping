function createOrder($rootScope, $scope, request, $mdDialog, mdToast, order, userId) {
    $scope.isCreate = !order;
    $scope.isEdit = $scope.isCreate;
    if ($scope.isCreate) {
        $scope.title = constants.title.CREATE_ORDER;
    } else {
        $scope.order = JSON.parse(JSON.stringify(order));

        $scope.isWaiting = $scope.order.Status === $app.enums.orderStatus.Waiting;
        $scope.isShipping = $scope.order.Status === $app.enums.orderStatus.Shipping;
        $scope.isDone = $scope.order.Status === $app.enums.orderStatus.Done;
        $scope.isExpired = $scope.order.Status === $app.enums.orderStatus.Expired;
        $scope.isCanceled = $scope.order.Status === $app.enums.orderStatus.Canceled;

        $scope.title = $scope.isShipping || $scope.isDone ? constants.title.ORDER_INFO : constants.title.UPDATE_ORDER;
    }

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
        if ($scope.form.createOrder.$invalid) return;
        $scope.waiting = true;

        $scope.startTime.setHours($scope.hour, $scope.minute);
        $scope.order.StartTime = $scope.startTime;

        if ($scope.isCreate) {
            $scope.order.ShopId = userId;
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
        request.updateOrder($scope.order, onDone, onError);
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
        var data = response.data;

        if (data.RequestType === type.Order) {
            if (data.ResponseStatus === status.Success) {
                var message = constants.lbl.CREATE_ORDER_SUCCESS;
                if (!$scope.isCreate) {
                    message = constants.lbl.UPDATE_ORDER_SUCCESS;
                    $scope.isEdit = false;

                    $rootScope.$broadcast('createOrUpdateOrder');
                } else {
                    $mdDialog.hide();
                }

                mdToast.show(String.format(message, $scope.order.OrderName));
            }
        }
    }

    function onDone(response) {
        var status = $app.enums.responseStatus;
        var type = $app.enums.requestType;
        var data = response.data;

        if (data.RequestType === type.Order) {
            if (data.ResponseStatus === status.Success) {
                $rootScope.$broadcast('createOrUpdateOrder');
                $mdDialog.show(
                    $mdDialog.confirm()
                        .title(constants.title.NOTIFY)
                        .textContent(String.format(constants.lbl.ORDER_COMPLETED, $scope.order.OrderName))
                        .ok(constants.btn.OK)
                        .cancel(constants.btn.CANCEL)
                ).then(function() {
                    $app.loadScript('/Scripts/controllers/reviewsShipper.js', null, function () {
                        $mdDialog.show({
                            templateUrl: 'reviews-shipper.html',
                            controller: 'reviewsShipper',
                            locals: {
                                order: $scope.order,
                                shipperId: $scope.order.SelectedShipperId
                            }
                        });
                    });
                }, function () { });
            }
        }
    }

    function onError(response) {
        $scope.waiting = false;
        mdToast.show(response.data.ExceptionMessage, 10000, 'top right');
        console.error(response.data);
    }
}
