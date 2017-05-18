function profile($scope, request, mdToast, cookies) {
    $scope.user = cookies.getUserLogin();
    $scope.userType = getUserType($scope.user.UserType);
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

    function getUserType(userType) {
        if (userType === $app.enums.userType.ShopManager)
            return constants.lbl.SHOP_MANAGER;

        if (userType === $app.enums.userType.Shipper)
            return constants.lbl.SHIPPER;
    }

    function onSuccess(response) {
        $scope.waiting = false;

        var status = $app.enums.responseStatus;
        var type = $app.enums.requestType;
        var data = response.data;

        if (data.ResponseStatus === status.Success) {
            if (data.RequestType === type.User) {
                mdToast.show(constants.lbl.UPDATE_PROFILE_SUCCESS);
                cookies.setUserLogin($scope.user);
            }

            if (data.RequestType === type.Reviews) {
                $scope.listReviews = data.Data;
                $scope.listReviews.forEach(item => {
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
