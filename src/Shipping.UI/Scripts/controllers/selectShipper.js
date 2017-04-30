function selectShipper($scope, request, $mdDialog, mdToast, $mdBottomSheet, order, userId, isRegistered) {
    $scope.title = String.format(constants.title.SELECT_SHIPPER, order.OrderName);
    $scope.selectedShipperId = order.SelectedShipperId;

    $scope.closeDialog = function () {
        $mdDialog.cancel();
    };

    $scope.select = function () {
        order.SelectedShipperId = parseInt($scope.selectedShipperId);
        request.selectShipper(order, onSuccess, onError);
    }

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

        if (response.data.ResponseStatus === status.Success) {
            if (response.data.RequestType === type.Register)
                $scope.shippers = response.data.Data;

            if (response.data.RequestType === type.Order) {
                var selectedShipper = $scope.shippers.find(s => s.UserId == $scope.selectedShipperId);
                mdToast.showToast(String.format(constants.lbl.SELECTED, selectedShipper.FullName, order.OrderName), 5000, 'bottom right');
            }
        }
    }

    function onError() {

    }
}
