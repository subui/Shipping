var app = angular.module('app', ['ngMaterial', 'ngMessages', 'ngSanitize']);

app.run(function ($rootScope) {
    $rootScope.consts = constants;
});

app.controller('main', function ($scope, $timeout, $mdSidenav) {
    $scope.openSidenav = buildToggler('left');
    
    function buildToggler(componentId) {
        return function() {
            $mdSidenav(componentId).toggle();
        };
    };
});