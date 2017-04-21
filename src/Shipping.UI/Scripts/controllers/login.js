﻿function login($rootScope, $scope, request, $window, mdToast, cookies) {
    $scope.isLogin = false;
    if (cookies.getUserLogin()) {
        $scope.isLogin = true;
        $window.location.href = '/app';
        return;
    }
    $scope.waiting = false;
    $scope.login = function () {
        if (!$scope.form.login.$valid) return;
        $scope.waiting = true;
        var user = new $app.entities.User($scope.username, sha256_digest($scope.password));
        request.login(user, onSuccess, onError);
    };

    function onSuccess(response) {
        var status = $app.enums.responseStatus;
        if (response.data.ResponseStatus === status.Success) {
            cookies.setUserLogin(response.data.UserLogin);
            $window.location.href = '/app';
            return;
        }

        $scope.waiting = false;

        if (response.data.ResponseStatus === status.ErrorUsernameNotExist) {
            $scope.error = $rootScope.consts.lbl.ERROR_USERNAME_NOT_EXIST;
        }

        if (response.data.ResponseStatus === status.PasswordIncorrect) {
            $scope.error = $rootScope.consts.lbl.PASSWORD_INCORRECT;
        }

        mdToast.showToast($scope.error, 10000, 'top right');
    }

    function onError(response) {
        $scope.waiting = false;
        mdToast.showToast('An error has occurred.', 10000, 'top right');
        console.error(response.data);
    }
}
