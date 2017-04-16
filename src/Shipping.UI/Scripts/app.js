// ...
var $app = {
    apiUrl: 'http://localhost:1110/',
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
    enums: {
        responseStatus: {
            Success: 0,
            ErrorUsernameExist: 1,
            ErrorUsernameNotExist: 2,
            ErrorEmailExist: 3,
            PasswordIncorrect: 4
        },
        userType: {
            Admin: 0,
            ShopManager: 1,
            Shipper: 2
        }
    },
    MenuItem: function (title, children, action) {
        this.title = title;
        this.children = children;
        this.action = action;
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
    $rootScope.typeOf = function (obj) {
        return typeof obj;
    };
});

app.factory('cookies', cookies)
    .factory('mdToast', mdToast)
    .factory('request', request);

app.config(function ($mdThemingProvider) {
    $mdThemingProvider.theme('dialogTheme');
});

app.controller('signUp',
        function($rootScope, $scope, request, $window, mdToast) {
            signUp($rootScope, $scope, request, $window, mdToast);
        })
    .controller('login',
        function($rootScope, $scope, request, $window, mdToast, cookies) {
            login($rootScope, $scope, request, $window, mdToast, cookies);
        })
    .controller('main',
        function($rootScope, $scope, request, $window, $timeout, $mdSidenav, $mdDialog, mdToast, cookies) {
            main($rootScope, $scope, request, $window, $timeout, $mdSidenav, $mdDialog, mdToast, cookies);
        })
    .controller('createOrder',
        function($scope, request, $mdDialog, mdToast) {
            createOrder($scope, request, $mdDialog, mdToast);
        });


function cookies($cookies) {
    function setUserLogin(user) {
        $cookies.putObject('userLogin', user, { path: '/' });
    }

    function getUserLogin() {
        return $cookies.getObject('userLogin', { path: '/' });
    }

    function userLogout() {
        $cookies.remove('userLogin', { path: '/' });
    }

    return {
        getUserLogin: getUserLogin,
        setUserLogin: setUserLogin,
        userLogout: userLogout
    }
}

function mdToast($mdToast) {
    function showToast(textContent, hideDelay, position) {
        $mdToast.show($mdToast.simple()
            .textContent(textContent)
            .hideDelay(hideDelay)
            .position(position));
    }

    return {
        showToast: showToast
    }
}

function request($http) {
    function createNewUser(user, onSuccess, onError) {
        $http.post($app.apiUrl + constants.req.SIGN_UP, user)
            .then(onSuccess, onError);
    }

    function login(user, onSuccess, onError) {
        $http.post($app.apiUrl + constants.req.LOGIN, user)
            .then(onSuccess, onError);
    }

    function getListOrders(onSuccess, onError) {
        $http.get($app.apiUrl + constants.req.ORDER)
            .then(onSuccess, onError);
    }

    function createOrder(order, onSuccess, onError) {
        $http.post($app.apiUrl + constants.req.ORDER, order)
            .then(onSuccess, onError);
    }

    return {
        createNewUser: createNewUser,
        login: login,
        getListOrders: getListOrders,
        createOrder: createOrder
    }
}
