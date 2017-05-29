function signUp($rootScope, $scope, request, $window, mdToast) {
    $scope.waiting = false;
    $scope.signUp = function () {
        if ($scope.form.signUp.$invalid) return;
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
        var data = response.data;

        if (data.RequestType === type.SignUp) {
            if (data.ResponseStatus === status.Success) {
                $window.location.href = '/account/login.html';
                return;
            }

            if (data.ResponseStatus === status.ErrorUsernameExist) {
                $scope.error = $rootScope.consts.lbl.ERROR_USERNAME_EXIST;
            }

            if (data.ResponseStatus === status.ErrorEmailExist) {
                $scope.error = $rootScope.consts.lbl.ERROR_EMAIL_EXIST;
            }

            mdToast.show($scope.error, 'top right');
        }
    }

    function onError(response) {
        $scope.waiting = false;
        mdToast.show(response.data.ExceptionMessage, 10000, 'top right');
        console.error(response.data);
    }
}
