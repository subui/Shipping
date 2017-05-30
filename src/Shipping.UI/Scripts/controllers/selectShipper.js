function selectShipper($scope, request, $mdDialog, mdToast, order) {
    $scope.waiting = true;
    $scope.title = String.format(constants.title.SELECT_SHIPPER, order.OrderName);
    $scope.selectedShipperId = order.SelectedShipperId;

    $scope.closeDialog = function () {
        $mdDialog.cancel();
    };

    $scope.select = function () {
        $scope.waiting = true;
        order.SelectedShipperId = parseInt($scope.selectedShipperId);
        request.selectShipper(order, onSuccess, onError);
    }

    $scope.viewShipperInfo = function (shipper, event) {
        $app.loadScript('/Scripts/controllers/shipperInfo.js',
            null,
            function() {
                $mdDialog.show({
                    multiple: true,
                    targetEvent: event,
                    clickOutsideToClose: true,
                    templateUrl: '/Templates/shipper-info.html',
                    controller: 'shipperInfo',
                    locals: {
                        shipper: shipper
                    }
                });
            });
    };

    request.getShipperRegisteredByOrderId(order.OrderId, onSuccess, onError);

    function onSuccess(response) {
        $scope.waiting = false;

        var status = $app.enums.responseStatus;
        var type = $app.enums.requestType;
        var data = response.data;

        if (data.ResponseStatus === status.Success) {
            if (data.RequestType === type.Register)
                $scope.shippers = data.Data;

            if (data.RequestType === type.Order) {
                var selectedShipper = $scope.shippers.find(s => s.UserId === parseInt($scope.selectedShipperId));
                mdToast.show(String.format(constants.lbl.SELECTED, selectedShipper.FullName, order.OrderName), 5000);
                $mdDialog.hide();
            }
        }
    }

    function onError(response) {
        $scope.waiting = false;
        mdToast.show(response.data.ExceptionMessage, 10000, 'top right');
        console.error(response.data);
    }
}
