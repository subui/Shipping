var app = angular.module('account', ['ngMaterial', 'ngMessages']);

app.run(function($rootScope) {
    $rootScope.consts = constants;
});

app.controller('sign-up', function($scope) {
    $scope.type = 1;
});