var account = angular.module('account', ['ngMaterial', 'ngMessages', 'ngSanitize']);

account.run(function ($rootScope) {
    $rootScope.consts = constants;
});

account.controller('sign-up', function ($scope) {
    $scope.signUp = function () {
        if (!$scope.signup.$valid) return;
        var user = new $app.entities.User($scope.fullName, $scope.username, $scope.password, $scope.email, $scope.phoneNumber, $scope.userType);

    };
});

account.controller('login', function ($scope) {

});