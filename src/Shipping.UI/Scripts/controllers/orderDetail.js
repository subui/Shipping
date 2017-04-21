function orderDetail($scope, request, $mdDialog, order, userId) {
    $scope.order = order;
    $scope.closeDialog = function () {
        $mdDialog.cancel();
    };

    $scope.register = function () {
        $scope.waiting = true;
        var reg = new $app.entities.ShippingRegistration(order.OrderId, userId, new Date());
        request.registerOrder(reg, onSuccess, onError);
    };

    function onSuccess(response) {
        $scope.waiting = false;
        var status = $app.enums.responseStatus;
        if (response.data === status.Success) $mdDialog.hide();
    }

    function onError() {
        
    }
}