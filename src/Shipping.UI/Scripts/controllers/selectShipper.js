function selectShipper($scope, request, $mdDialog, $mdBottomSheet, order, userId, isRegistered) {
    $scope.title = String.format(constants.title.SELECT_SHIPPER, order.OrderName);

    $scope.closeDialog = function () {
        $mdDialog.cancel();
    };

    $scope.viewShipperInfo = function (shipper) {
        $scope.alert = '';
        $mdBottomSheet.show({
            templateUrl: '/Templates/bottom-sheet-shipper-info.html',
            controller: 'bottomSheet',
            locals: {
                shipper: shipper
            }
        }).then(function (clickedItem) {
            
        }).catch(function (error) {
            // User clicked outside or hit escape
        });
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