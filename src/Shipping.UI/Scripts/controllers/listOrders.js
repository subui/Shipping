function listOrders($rootScope, $scope, request, $mdDialog, mdToast) {
    $scope.waiting = true;

    mdToast.showToast(constants.lbl.LOADING_LIST_ORDERS, 0, 'bottom right');
    request.getListOrdersByUserId($scope.userId, onSuccess, onError);

    $scope.filter = {
        allItems: true,
        waiting: true,
        shipping: true,
        done: true,
        expired: true,
        canceled: true
    };

    $scope.filterItems = function(all) {
        if (all) {
            if ($scope.filter.allItems) {
                $scope.filter.waiting = true;
                $scope.filter.shipping = true;
                $scope.filter.done = true;
                $scope.filter.expired = true;
                $scope.filter.canceled = true;
            } else {
                $scope.filter.waiting = false;
                $scope.filter.shipping = false;
                $scope.filter.done = false;
                $scope.filter.expired = false;
                $scope.filter.canceled = false;
            }
        } else {
            if ($scope.filter.waiting &&
                $scope.filter.shipping &&
                $scope.filter.done &&
                $scope.filter.expired &&
                $scope.filter.canceled) {
                $scope.filter.allItems = true;
            } else {
                $scope.filter.allItems = false;
            }
        }

        $scope.orders = $scope.listOrders;

        if (!$scope.filter.waiting)
            $scope.orders = $scope.orders.filter(order => order.Order.Status !== $app.enums.orderStatus.Waiting);

        if (!$scope.filter.shipping)
            $scope.orders = $scope.orders.filter(order => order.Order.Status !== $app.enums.orderStatus.Shipping);

        if (!$scope.filter.done)
            $scope.orders = $scope.orders.filter(order => order.Order.Status !== $app.enums.orderStatus.Done);

        if (!$scope.filter.expired)
            $scope.orders = $scope.orders.filter(order => order.Order.Status !== $app.enums.orderStatus.Expired);

        if (!$scope.filter.canceled)
            $scope.orders = $scope.orders.filter(order => order.Order.Status !== $app.enums.orderStatus.Canceled);

        if ($scope.filter.allItems)
            $scope.orders = $scope.listOrders;
    };

    $scope.showDetail = function (event, order) {
        if ($scope.userLogin.UserType === $app.enums.userType.ShopManager) {
            $scope.createOrder(event, order);
            return;
        }

        $mdDialog.show({
            //            parent: angular.element(document.body),
            targetEvent: event,
            templateUrl: 'order-detail.html',
            clickOutsideToClose: true,
            controller: 'orderDetail',
            locals: {
                order: order,
                userId: $scope.userId,
                isRegistered: $scope.isRegistered
            }
        })
        .then(function () {
            var message;
            var index;

            if ($scope.isRegistered) {
                message = constants.lbl.UNREGISTER_ORDER_SUCCESS;
                index = $scope.listOrdersRegistered.indexOf(order);
                $scope.listOrdersRegistered.splice(index, 1);

                $scope.listOrdersNotRegistered.push(order);
                $scope.listOrdersNotRegistered.sort((o1, o2) => o1.OrderId - o2.OrderId);
            } else {
                message = constants.lbl.REGISTER_ORDER_SUCCESS;
                index = $scope.listOrdersNotRegistered.indexOf(order);
                $scope.listOrdersNotRegistered.splice(index, 1);

                $scope.listOrdersRegistered.push(order);
                $scope.listOrdersRegistered.sort((o1, o2) => o1.OrderId - o2.OrderId);
            }
            mdToast.showToast(String.format(message, order.OrderName), 3000, 'bottom right');
        }, function () {
        });
    };

    $scope.showShipper = function (event, order) {
        event.stopPropagation();
        $mdDialog.show({
            targetEvent: event,
            templateUrl: 'select-shipper.html',
            clickOutsideToClose: true,
            controller: 'selectShipper',
            locals: {
                order: order,
                userId: $scope.userId,
                isRegistered: $scope.isRegistered
            }
        });
    };

    $scope.$on('createOrUpdateOrder', function() {
        request.getListOrdersByUserId($scope.userId, onSuccess, onError);
    });

    $scope.$on('getOrders', function() {
        $scope.orders = $scope.listOrdersNotRegistered;
        $scope.isRegistered = false;
    });

    $scope.$on('getOrdersRegistered', function() {
        $scope.orders = $scope.listOrdersRegistered;
        $scope.isRegistered = true;
    });

    function getColor(status) {
        var orderStatus = $app.enums.orderStatus;
        var color = constants.color;
        switch (status) {
            case orderStatus.Waiting:
                return color.WAITING;

            case orderStatus.Shipping:
                return color.SHIPPING;

            case orderStatus.Done:
                return color.DONE;

            case orderStatus.Expired:
                return color.EXPIRED;

            case orderStatus.Canceled:
                return color.CANCELED;

            default:
                return color.UNKNOWN;
        }
    }

    function onSuccess(response) {
        $scope.waiting = false;

        var status = $app.enums.responseStatus;
        var type = $app.enums.requestType;

        if (response.data.ResponseStatus === status.Success) {
            if (response.data.RequestType === type.Order) {
                mdToast.hide();
                $scope.listOrders = response.data.Data;

                if ($scope.isShopManager) {
                    $scope.orders = $scope.listOrders;
                    $scope.orders.forEach(order => {
                        order.ShipperCount = String.format(constants.btn.LIST_SHIPPER_REGISTERED, order.ShipperCount);
                        order.color = getColor(order.Order.Status);
                    });
                } else {
                    request.getOrderRegisteredByShipperId($scope.userId, onSuccess, onError);
                }

            }

            if (response.data.RequestType === type.Register) {
                response.data.Data.forEach(item =>
                    item.color = item.SelectedShipperId === $scope.userId
                        ? constants.color.DONE
                        : constants.color.UNKNOWN);

                $scope.listOrdersRegistered = response.data.Data;
                $scope.listOrdersNotRegistered = [];

                $scope.listOrders.filter(order => {
                    var isRegistered = $scope.listOrdersRegistered.some(o => o.OrderId === order.Order.OrderId);
                    if (!isRegistered) {
                        order.Order.color = constants.color.UNKNOWN;
                        $scope.listOrdersNotRegistered.push(order.Order);
                    }
                });

                $scope.orders = $scope.listOrdersNotRegistered;
            }
        }
    }

    function onError(response) {
        $scope.waiting = false;
        mdToast.showToast(constants.lbl.ERROR, 3000, 'bottom right');
        console.error(response.data);
    }
}