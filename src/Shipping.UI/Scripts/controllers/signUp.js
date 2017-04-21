function signUp($rootScope, $scope, request, $window, mdToast) {
    $scope.waiting = false;
    $scope.signUp = function () {
        if (!$scope.signup.$valid) return;
        $scope.waiting = true;
        var user = new $app.entities.User($scope.username,
                                          sha256_digest($scope.password),
                                          $scope.fullName, $scope.email,
                                          $scope.phoneNumber,
                                          $scope.userType);
        request.createNewUser(user, onSuccess, onError);
    };

    function onSuccess(response) {
        $scope.waiting = false;

        var status = $app.enums.responseStatus;
        var type = $app.enums.requestType;

        if (response.data.RequestType === type.SignUp) {
            if (response.data.ResponseStatus === status.Success) {
                $window.location.href = '/account/login.html';
                return;
            }

            if (response.data.ResponseStatus === status.ErrorUsernameExist) {
                $scope.error = $rootScope.consts.lbl.ERROR_USERNAME_EXIST;
            }

            if (response.data.ResponseStatus === status.ErrorEmailExist) {
                $scope.error = $rootScope.consts.lbl.ERROR_EMAIL_EXIST;
            }

            mdToast.showToast($scope.error, 0, 'top right');
        }
    }

    function onError(response) {
        $scope.waiting = false;
        mdToast.showToast('An error has occurred.', 10000, 'top right');
        console.error(response.data);
    }
}
