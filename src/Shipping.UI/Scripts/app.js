var app = angular.module('app', ['ngMaterial', 'ngMessages', 'ngSanitize']);

app.run(function ($rootScope) {
    $rootScope.consts = constants;
});

app.controller('main', function ($scope) {
    
});