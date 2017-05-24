function profile($scope, request, mdToast, cookies) {
    $scope.userType = $scope.isShopManager ? constants.lbl.SHOP_MANAGER : constants.lbl.SHIPPER;
    $scope.user = cookies.getUserLogin();
    $scope.setTitle(constants.title.PROFILE);
    $scope.gender = [
        {
            key: $app.enums.gender.Male,
            value: constants.lbl.MALE
        },
        {
            key: $app.enums.gender.Female,
            value: constants.lbl.FEMALE
        }
    ];

    request.getListReviews(onSuccess, onError);

    $scope.save = function() {
        if ($scope.form.profile.$invalid) return;
        $scope.waiting = true;
        request.updateUserInfo($scope.user, onSuccess, onError);
    };

    function onSuccess(response) {
        $scope.waiting = false;

        var status = $app.enums.responseStatus;
        var type = $app.enums.requestType;
        var data = response.data;

        if (data.ResponseStatus === status.Success) {
            if (data.RequestType === type.User) {
                mdToast.show(constants.lbl.UPDATE_PROFILE_SUCCESS, 3000);
                cookies.setUserLogin($scope.user);
            }

            if (data.RequestType === type.Reviews) {
                $scope.listReviews = data.Data;
                $scope.reviews = String.format(constants.lbl.REVIEWS, $scope.listReviews.length);
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
            }
        }
    }

    function onError(response) {
        $scope.waiting = false;
        mdToast.show(constants.lbl.ERROR, 1000, 'top right');
        console.error(response.data);
    }
}
