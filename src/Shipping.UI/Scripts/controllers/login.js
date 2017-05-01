function login($rootScope, $scope, request, $window, mdToast, cookies) {
    $scope.isLogin = false;
    if (cookies.getUserLogin()) {
        $scope.isLogin = true;
        $window.location.href = '/app';
        return;
    }
    $scope.waiting = false;
    $scope.login = function () {
        if ($scope.form.login.$invalid) return;
        $scope.waiting = true;
        var user = new $app.entities.User($scope.username, sha256_digest($scope.password));
        request.login(user, onSuccess, onError);
    };

    function onSuccess(response) {
        var status = $app.enums.responseStatus;
        var type = $app.enums.requestType;
        var data = response.data;

        if (data.RequestType === type.Login) {
            if (data.ResponseStatus === status.Success) {
                cookies.setUserLogin(data.Data);
                $window.location.href = '/app';
                return;
            }

            $scope.waiting = false;

            if (data.ResponseStatus === status.ErrorUsernameNotExist) {
                $scope.error = $rootScope.consts.lbl.ERROR_USERNAME_NOT_EXIST;
            }

            if (data.ResponseStatus === status.ErrorPasswordIncorrect) {
                $scope.error = $rootScope.consts.lbl.ERROR_PASSWORD_INCORRECT;
            }

            mdToast.show($scope.error, 10000, 'top right');
        }
    }

    function onError(response) {
        $scope.waiting = false;
        mdToast.show('An error has occurred.', 10000, 'top right');
        console.error(response.data);
    }
}
