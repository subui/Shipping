function selectShipper($scope, request, $mdDialog, order, userId, isRegistered) {
    $scope.title = constants.title.SELECT_SHIPPER;

    $scope.closeDialog = function () {
        $mdDialog.cancel();
    };

    request.getShipperRegisteredByOrderId(order.OrderId, onSuccess, onError);

    function onSuccess(response) {
        $scope.waiting = false;

        var status = $app.enums.responseStatus;
        var type = $app.enums.requestType;

        if (response.data.RequestType === type.Register && response.data.ResponseStatus === status.Success)
            $scope.shippers = response.data.Data;
    }

    function onError() {

    }
}