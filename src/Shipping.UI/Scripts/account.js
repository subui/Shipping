var account = angular.module('account', ['ngMaterial', 'ngMessages', 'ngSanitize']);

account.run(function ($rootScope) {
    $rootScope.consts = constants;
});

account.controller('sign-up', function ($scope, $http) {
    $scope.signUp = function () {
        if (!$scope.signup.$valid) return;
        var user = new $app.entities.User($scope.fullName, $scope.username, sha256_digest($scope.password), $scope.email, $scope.phoneNumber, $scope.userType);
        $app.createNewUser($http, user, onSuccess, onError);
    };

    function onSuccess(response) {
        alert('success');
    }

    function onError(response) {
        alert('error');
    }
});

account.controller('login', function ($scope) {

});