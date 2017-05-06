function listOrders($rootScope, $scope, request, $timeout, $mdDialog, mdToast) {
    $scope.waiting = true;
    $scope.setTitle(constants.title.ORDER_MANAGEMENT);

    mdToast.show(constants.lbl.LOADING_LIST_ORDERS);
    request.getListOrders(onSuccess, onError);

    $scope.filter = {
        allItems: true,
        waiting: true,
        shipping: true,
        done: true,
        expired: true,
        canceled: true
    };

    $scope.filterItems = function (all) {
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
            mdToast.show(String.format(message, order.OrderName), 3000);
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

    $scope.isShipping = function (order) {
        return order.Status === $app.enums.orderStatus.Shipping;
    };

    $scope.isDone = function (order) {
        return order.Status === $app.enums.orderStatus.Done;
    };

    $scope.isShippingOrDone = function (order) {
        return $scope.isDone(order) || $scope.isShipping(order);
    };

    $scope.$on('createOrUpdateOrder', function () {
        request.getListOrders(onSuccess, onError);
    });

    $scope.$on('getOrders', function () {
        $scope.orders = $scope.listOrdersNotRegistered;
        $scope.isRegistered = false;
    });

    $scope.$on('getOrdersRegistered', function () {
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
        var data = response.data;

        if (data.ResponseStatus === status.Success) {
            if (data.RequestType === type.Order) {
                $timeout(mdToast.hide(), 1000);
                $scope.listOrders = data.Data;

                if ($scope.isShopManager) {
                    $scope.orders = $scope.listOrders;
                    $scope.orders.forEach(order => {
                        if ($scope.isShipping(order.Order)) {
                            order.ShipperName = String.format(constants.lbl.SHIPPER_SHIPPING, order.ShipperName);
                        } else if ($scope.isDone(order.Order)) {
                            order.ShipperName = String.format(constants.lbl.SHIPPER_DONE, order.ShipperName);
                        } else {
                            order.ShipperCount = String.format(constants.btn.LIST_SHIPPER_REGISTERED, order.ShipperCount);
                        }

                        order.color = getColor(order.Order.Status);
                    });
                } else {
                    request.getOrderRegisteredByShipperId($scope.userId, onSuccess, onError);
                }

            }

            if (data.RequestType === type.Register) {
                data.Data.forEach(item =>
                    item.color = item.SelectedShipperId === $scope.userId
                        ? constants.color.DONE
                        : constants.color.UNKNOWN);

                $scope.listOrdersRegistered = data.Data;
                $scope.listOrdersNotRegistered = [];

                $scope.listOrders.forEach(order => {
                    var isRegistered = $scope.listOrdersRegistered.some(o => o.OrderId === order.OrderId);
                    if (!isRegistered) {
                        order.color = constants.color.UNKNOWN;
                        $scope.listOrdersNotRegistered.push(order);
                    }
                });

                $scope.orders = $scope.listOrdersNotRegistered;
            }
        }
    }

    function onError(response) {
        $scope.waiting = false;
        mdToast.show(constants.lbl.ERROR, 1000, 'top right');
        console.error(response.data);
    }
}
