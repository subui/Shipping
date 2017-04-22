function orderDetail($scope, request, $mdDialog, order, userId, isRegistered) {
    $scope.order = order;
    $scope.isRegistered = isRegistered;

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

        if (response.data.RequestType === type.Register && response.data.ResponseStatus === status.Success)
            $mdDialog.hide();

        if (response.data.RequestType === type.User && response.data.ResponseStatus === status.Success)
            $scope.shopName = response.data.Data;
    }

    function onError() {
        
    }
}
