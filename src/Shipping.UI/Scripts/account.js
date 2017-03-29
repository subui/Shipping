function signUp($rootScope, $scope, $http, $window, $mdToast) {
    $scope.waiting = false;
    $scope.signUp = function () {
        if (!$scope.signup.$valid) return;
        $scope.waiting = true;
        var user = new $app.entities.User($scope.username, sha256_digest($scope.password), $scope.fullName, $scope.email, $scope.phoneNumber, $scope.userType);
        $app.requestCreateNewUser($http, user, onSuccess, onError);
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

        $app.showToast($mdToast, $scope.error, 10000, 'top right');
    }

    function onError(response) {
        $scope.waiting = false;
        alert('Something went wrong!');
    }
}

function login($rootScope, $scope, $http, $window, $mdToast) {
    $scope.waiting = false;
    $scope.login = function() {
        if (!$scope.fLogin.$valid) return;
        $scope.waiting = true;
        var user = new $app.entities.User($scope.username, sha256_digest($scope.password));
        $app.requestLogin($http, user, onSuccess, onError);
    };

    function onSuccess(response) {
        $scope.waiting = false;
        var status = $app.responseStatus;
        if (response.data === status.Success) {
            $window.location.href = '/app';
            return;
        }

        if (response.data === status.ErrorUsernameNotExist) {
            $scope.error = $rootScope.consts.lbl.ERROR_USERNAME_NOT_EXIST;
        }

        if (response.data === status.PasswordIncorrect) {
            $scope.error = $rootScope.consts.lbl.PASSWORD_INCORRECT;
        }

        $app.showToast($mdToast, $scope.error, 10000, 'top right');
    }

    function onError(response) {
        $scope.waiting = false;
        alert('Something went wrong!');
    }
}
