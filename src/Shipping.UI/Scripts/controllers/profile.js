function profile($scope, request, mdToast, cookies) {
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

        if (data.RequestType === type.User) {
            if (data.ResponseStatus === status.Success) {
                mdToast.show(constants.lbl.UPDATE_PROFILE_SUCCESS);
                cookies.setUserLogin($scope.user);
            }
        }
    }

    function onError(response) {
        $scope.waiting = false;
        mdToast.show(constants.lbl.ERROR, 1000, 'top right');
        console.error(response.data);
    }
}
