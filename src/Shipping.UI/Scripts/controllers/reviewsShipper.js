function reviewsShipper($scope, request, $mdDialog, mdToast, $timeout, $interval, order, shipperId) {
    request.getShipperNameByUserId(shipperId, onSuccess, onError);

    $scope.closeDialog = function () {
        $mdDialog.cancel();
    };

    $scope.stars = [];
    $scope.stared = 0;
    $scope.starColor = 'dialogTheme-amber';

    for (var i = 0; i < 10; i++) {
        $scope.stars.push({
            icon: 'star_border',
            direction: 'top',
            tooltip: false
        });
    }

    $scope.starHoverIn = function (index) {
        for (var i = 0; i < 10; i++) {
            $scope.stars[i].tooltip = false;
            $scope.stars[i].icon = i < index ? 'star' : 'star_border';
        }
    };

    $scope.starHoverOut = function () {
        for (var i = 0; i < 10; i++) {
            $scope.stars[i].icon = i < $scope.stared ? 'star' : 'star_border';
        }

        if ($scope.stared) {
            $timeout(() => {
                $scope.stars[$scope.stared - 1].tooltip = true;
            }, 200);
        }
    };

    $scope.starClick = function (index) {
        $scope.stared = index + 1;
        $scope.showTooltip = false;
        $interval.cancel($scope.warning);
    };

    $scope.save = function () {
        if ($scope.form.reviews.$invalid) return;
        if (!$scope.stared) {
            $scope.showTooltip = true;
            $scope.visible = true;
            $scope.warning = $interval(() => {
                $scope.starColor = 'dialogTheme-amber-700';
                $timeout(() => {
                    $scope.starColor = 'dialogTheme-amber-900';
                    $timeout(() => {
                        $scope.starColor = 'dialogTheme-orange-900';
                        $timeout(() => {
                            $scope.starColor = 'dialogTheme-amber-900';
                            $timeout(() => {
                                $scope.starColor = 'dialogTheme-amber-700';
                                $timeout(() => {
                                    $scope.starColor = 'dialogTheme-amber';
                                }, 100);
                            }, 100);
                        }, 100);
                    }, 100);
                }, 100);
            }, 600);

            return;
        }

        $scope.waiting = true;
        $scope.stars[$scope.stared - 1].tooltip = false;
        var rev = new $app.entities.ReviewsShipper(order.OrderId, $scope.stared, $scope.content, new Date());
        request.reviewsShipper(rev, onSuccess, onError);
    }

    function onSuccess(response) {
        $scope.waiting = false;

        var status = $app.enums.responseStatus;
        var type = $app.enums.requestType;
        var data = response.data;

        if (data.ResponseStatus === status.Success) {
            if (data.RequestType === type.User)
                $scope.shipperName = data.Data;
                $scope.title = String.format(constants.title.REVIEWS_SHIPPER, data.Data, order.OrderName);

            if (data.RequestType === type.Reviews) {
                mdToast.show(String.format(constants.lbl.REVIEWS_SUCCESS, $scope.shipperName), 3000);
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
