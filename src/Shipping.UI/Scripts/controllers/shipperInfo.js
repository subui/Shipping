function shipperInfo($scope, request, $mdDialog, mdToast, shipper) {
    $scope.shipper = shipper;
    $scope.title = String.format(constants.title.SHIPPER_INFO, shipper.FullName);
    $scope.gender = shipper.Gender === $app.enums.gender.Male ? constants.lbl.MALE : constants.lbl.FEMALE;
    $scope.birthDay = $app.formatDateTime(shipper.BirthDay).substring(0, 10);

    $scope.btnShowHide = constants.btn.SHOW_REVIEWS;

    request.getNumberOfReviews(shipper.UserId, onSuccess, onError);

    $scope.closeDialog = function () {
        $mdDialog.hide();
    };

    $scope.showReviews = function () {
        $scope.isShowReviews = !$scope.isShowReviews;
        if ($scope.isShowReviews) {
            $scope.flex = 40;
            $scope.btnShowHide = constants.btn.HIDE_REVIEWS;
        } else {
            $scope.flex = 100;
            $scope.btnShowHide = constants.btn.SHOW_REVIEWS;
        }

        if (!$scope.listReviews) {
            $scope.unloadReviews = true;
            request.getListReviews(shipper.UserId, onSuccess, onError);
        }
    }

    function onSuccess(response) {
        $scope.waiting = false;

        var status = $app.enums.responseStatus;
        var type = $app.enums.requestType;
        var data = response.data;

        if (data.ResponseStatus === status.Success) {
            if (data.RequestType === type.Reviews) {
                if (typeof data.Data === 'number') {
                    $scope.reviews = String.format(constants.lbl.REVIEWS, data.Data);
                } else {
                    $scope.listReviews = data.Data;
                    $scope.listReviews.forEach(item => {
                        item.RevTime = $app.formatDateTime(item.RevTime);
                        item.stars = [];
                        for (var i = 0; i < 10; i++) {
                            item.stars.push({
                                icon: i < item.Score ? 'star' : 'star_border',
                                direction: 'top',
                                tooltip: false
                            });
                        }
                    });
                    $scope.unloadReviews = false;
                }
            }
        }
    }

    function onError(response) {
        $scope.waiting = false;
        mdToast.show(response.data.ExceptionMessage, 10000, 'top right');
        console.error(response.data);
    }
}