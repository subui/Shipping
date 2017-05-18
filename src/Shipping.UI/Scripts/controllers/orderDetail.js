function orderDetail($scope, request, $mdDialog, order, userId, isRegistered) {
    $scope.order = order;
    $scope.isRegistered = isRegistered;
    $scope.isSelected = order.SelectedShipperId === userId;

    $scope.startTime = $app.formatDateTime($scope.order.StartTime);

    request.getShopNameByUserId(order.ShopId, onSuccess, onError);

    $scope.closeDialog = function () {
        $mdDialog.cancel();
    };

    $scope.register = function () {
        $scope.waiting = true;
        var reg = new $app.entities.ShippingRegistration(order.OrderId, userId, new Date());
        request.registerOrder(reg, onSuccess, onError);
    };

    $scope.unRegister = function () {
        $scope.waiting = true;
        request.unRegisterOrder(order.OrderId, userId, onSuccess, onError);
    };

    function onSuccess(response) {
        $scope.waiting = false;

        var status = $app.enums.responseStatus;
        var type = $app.enums.requestType;
        var data = response.data;

        if (data.ResponseStatus === status.Success) {
            if (data.RequestType === type.Register)
                $mdDialog.hide();

            if (data.RequestType === type.User)
                $scope.shopName = data.Data;
        }
    }

    function onError() {
        
    }
}
