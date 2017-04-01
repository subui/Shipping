function signUp($rootScope, $scope, request, $window, mdToast) {
    $scope.waiting = false;
    $scope.signUp = function () {
        if (!$scope.signup.$valid) return;
        $scope.waiting = true;
        var user = new $app.entities.User($scope.username, sha256_digest($scope.password), $scope.fullName, $scope.email, $scope.phoneNumber, $scope.userType);
        request.createNewUser(user, onSuccess, onError);
    };

    function onSuccess(response) {
        $scope.waiting = false;
        var status = $app.responseStatus;
        if (response.data === status.Success) {
            alert('success');
        }

        if (response.data === status.ErrorUsernameExist) {
            $scope.error = $rootScope.consts.lbl.ERROR_USERNAME_EXIST;
        }

        if (response.data === status.ErrorEmailExist) {
            $scope.error = $rootScope.consts.lbl.ERROR_EMAIL_EXIST;
        }

        mdToast.showToast($scope.error, 10000, 'top right');
    }

    function onError(response) {
        $scope.waiting = false;
        mdToast.showToast('An error has occurred.', 10000, 'top right');
        console.error(response.data);
    }
}
