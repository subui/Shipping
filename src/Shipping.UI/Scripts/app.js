// ...
var $app = {
    loadScript: function(src, type) {
        if (!src) return null;
        var script = document.querySelector('script[src*="' + src + '"]');
        if (!script) {
            var heads = document.getElementsByTagName('head');
            if (heads && heads.length) {
                var head = heads[0];
                script = document.createElement('script');
                script.setAttribute('src', src);
                if (type) script.setAttribute('type', type);
                head.appendChild(script);
            }
        }
        return script;
    }
};

// angular module
var app = angular.module('app', ['ngMaterial', 'ngMessages', 'ngSanitize']);

app.run(function ($rootScope) {
    $rootScope.consts = constants;
});

app.config(function ($mdThemingProvider) {
    $mdThemingProvider.theme('dialogTheme');
});

app.controller('main', function ($scope, $timeout, $mdSidenav, $mdDialog, $mdToast) { main($scope, $timeout, $mdSidenav, $mdDialog, $mdToast) })
    .controller('createOrder', function ($scope) { createOrder($scope) });
