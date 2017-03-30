// ...
var $app = {
    url: 'http://localhost:1110/',
    entities: {
        User: function (username, password, fullName, email, phoneNumber, userType) {
            this.UserId = null;
            this.Username = username;
            this.Password = password;
            this.FullName = fullName;
            this.Email = email;
            this.PhoneNumber = phoneNumber;
            this.BirthDay = null;
            this.Gender = null;
            this.UserType = userType;
            this.ShopName = null;
            this.ShopAddress = null;
            this.Score = null;
        },
        Order: function () {
            this.OrderId = null;
            this.OrderName = null;
            this.ShopId = null;
            this.StartingPoint = null;
            this.Destination = null;
            this.StartTime = null;
            this.RecipientsName = null;
            this.RecipientsPhoneNumber = null;
            this.AdvanceDeposit = null;
            this.Profit = null;
            this.SelectedShipperId = null;
            this.Status = null;
        },
        ShippingRegistration: function () {
            this.OrderId = null;
            this.ShipperId = null;
            this.RegTime = null;
        },
        ReviewsShipper: function () {
            this.OrderId = null;
            this.Score = null;
            this.Content = null;
            this.RevTime = null;
        }
    },
    responseStatus: {
        Success: 0,
        ErrorUsernameExist: 1,
        ErrorUsernameNotExist: 2,
        ErrorEmailExist: 3,
        PasswordIncorrect: 4
    },
    requestCreateNewUser: function ($http, user, onSuccess, onError) {
        $http.post($app.url + 'signup', user)
            .then(onSuccess, onError);
    },
    requestLogin: function ($http, user, onSuccess, onError) {
        $http.post($app.url + 'login', user)
            .then(onSuccess, onError);
    },
    loadScript: function (src, type) {
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
    },
    showToast: function ($mdToast, textContent, hideDelay, position) {
        $mdToast.show(
            $mdToast.simple()
                .textContent(textContent)
                .hideDelay(hideDelay)
                .position(position)
        );
    }
};

// angular module
var app = angular.module('app', ['ngMaterial', 'ngMessages', 'ngSanitize', 'ngCookies']);

app.run(function ($rootScope) {
    $rootScope.consts = constants;
});

app.factory('cookies', function ($cookies) {
    function set(key, value) {
        $cookies.put(key, value, { path: '/' });
    }

    function get(key) {
        return $cookies.get(key, { path: '/' });
    }

    return {
        get: get,
        set: set
    }
});

app.config(function ($mdThemingProvider) {
    $mdThemingProvider.theme('dialogTheme');
});

app.controller('signUp', function ($rootScope, $scope, $http, $window, $mdToast) { signUp($rootScope, $scope, $http, $window, $mdToast) })
    .controller('login', function ($rootScope, $scope, $http, $window, $mdToast, cookies) { login($rootScope, $scope, $http, $window, $mdToast, cookies) })
    .controller('main', function ($rootScope, $scope, $timeout, $mdSidenav, $mdDialog, $mdToast, cookies) { main($rootScope, $scope, $timeout, $mdSidenav, $mdDialog, $mdToast, cookies) })
    .controller('createOrder', function ($scope) { createOrder($scope) });
