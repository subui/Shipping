// ...
var $app = {
    url: 'http://localhost:1110/',
    entities: {
        User: function (fullName, username, password, email, phoneNumber, userType) {
            this.UserId = null;
            this.FullName = fullName;
            this.Username = username;
            this.Password = password;
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
    createNewUser: function($http) {
        $http.post($app.url + 'signup');
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
