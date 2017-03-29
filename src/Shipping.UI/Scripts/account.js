var account = angular.module('account', ['ngMaterial', 'ngMessages', 'ngSanitize']);

account.run(function ($rootScope) {
    $rootScope.consts = constants;
});

account.controller('sign-up', function ($scope, $http) {
    $scope.waiting = false;
    $scope.signUp = function () {
        if (!$scope.signup.$valid) return;
        $scope.waiting = true;
        var user = new $app.entities.User($scope.fullName, $scope.username, sha256_digest($scope.password), $scope.email, $scope.phoneNumber, $scope.userType);
        $app.createNewUser($http, user, onSuccess, onError);
    };

    function onSuccess(response) {
        $scope.waiting = false;
        var status = $app.responseStatus;
        if (response.data === status.Success) {
            alert('success');
        }

        if (response.data === status.ErrorUsernameExist) {
            alert('username da ton tai');
        }

        if (response.data === status.ErrorEmailExist) {
            alert('email da ton tai');
        }
    }

    function onError(response) {
        alert('error');
    }
});

account.controller('login', function ($scope) {

});