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
        ShippingRegistration: function (orderId, shipperId, regTime) {
            this.OrderId = orderId;
            this.ShipperId = shipperId;
            this.RegTime = regTime;
        },
        ReviewsShipper: function () {
            this.OrderId = null;
            this.Score = null;
            this.Content = null;
            this.RevTime = null;
        },
        UpdatePassword: function(userId, currentPassword, newPassword) {
            this.UserId = userId;
            this.CurrentPassword = sha256_digest(currentPassword);
            this.NewPassword = sha256_digest(newPassword);
        }
    },
    enums: {
        responseStatus: {
            ErrorNullValue: -1,
            Success: 0,
            ErrorUsernameExist: 1,
            ErrorUsernameNotExist: 2,
            ErrorEmailExist: 3,
            ErrorPasswordIncorrect: 4,
            ErrorOrderNotExist: 5
        },
        requestType: {
            Login: 1,
            SignUp: 2,
            User: 3,
            Order: 4,
            Register: 5
        },
        userType: {
            Admin: 0,
            ShopManager: 1,
            Shipper: 2
        },
        orderStatus: {
            Unknown: 0,
            Waiting: 1,
            Shipping: 2,
            Done: 3,
            Canceled: 4,
            Expired: 5
        },
        gender: {
            Unknown: 0,
            Male: 1,
            Female: 2
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
    }
};

String.format = function () {
    var s = arguments[0];
    for (var i = 0; i < arguments.length - 1; i++) {
        var reg = new RegExp("\\{" + i + "\\}", "gm");
        s = s.replace(reg, arguments[i + 1]);
    }
    return s;
}

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
        function ($rootScope, $scope, request, $window, mdToast) {
            signUp($rootScope, $scope, request, $window, mdToast);
        })
    .controller('login',
        function ($rootScope, $scope, request, $window, mdToast, cookies) {
            login($rootScope, $scope, request, $window, mdToast, cookies);
        })
    .controller('main',
        function ($scope, request, $window, $mdSidenav, $mdDialog, mdToast, cookies) {
            main($scope, request, $window, $mdSidenav, $mdDialog, mdToast, cookies);
        })
    .controller('listOrders',
        function ($rootScope, $scope, request, $timeout, $mdDialog, mdToast) {
            listOrders($rootScope, $scope, request, $timeout, $mdDialog, mdToast);
        })
    .controller('createOrder',
        function ($rootScope, $scope, request, $mdDialog, mdToast, order, userId) {
            createOrder($rootScope, $scope, request, $mdDialog, mdToast, order, userId);
        })
    .controller('profile',
        function ($scope, request, mdToast, cookies) {
            profile($scope, request, mdToast, cookies);
        })
    .controller('changePassword',
        function ($scope, request, mdToast) {
            changePassword($scope, request, mdToast);
        })
    .controller('orderDetail',
        function ($scope, request, $mdDialog, order, userId, isRegistered) {
            orderDetail($scope, request, $mdDialog, order, userId, isRegistered);
        })
    .controller('selectShipper',
        function ($scope, request, $mdDialog, mdToast, $mdBottomSheet, order, userId, isRegistered) {
            selectShipper($scope, request, $mdDialog, mdToast, $mdBottomSheet, order, userId, isRegistered);
        })
    .controller('reviewsShipper',
        function ($scope, request, $mdDialog, shipper) {
            reviewsShipper($scope, request, $mdDialog, shipper);
        })
    .controller('toastTemplate',
        function ($scope, $mdToast, textContent) {
            toastTemplate($scope, $mdToast, textContent);
        })
    .controller('bottomSheet',
        function ($scope, $mdBottomSheet, shipper) {
            bottomSheet($scope, $mdBottomSheet, shipper);
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
    function show(textContent, hideDelay, position) {
        if (typeof hideDelay === 'undefined') {
            hideDelay = 0;
        }
        else if (typeof hideDelay === 'string') {
            position = hideDelay;
            hideDelay = 0;
        }

        if (typeof position === 'undefined') {
            position = 'bottom right';
        }

        hideDelay === 0 ? $mdToast.show({
                            templateUrl: '/Templates/toast-template.html',
                            controller: 'toastTemplate',
                            hideDelay: 0,
                            position: position,
                            locals: {
                                textContent: textContent
                            }
                        })
                        : $mdToast.show($mdToast.simple()
                            .textContent(textContent)
                            .hideDelay(hideDelay)
                            .position(position));
    }

    function hide() {
        $mdToast.hide();
    }

    return {
        show: show,
        hide: hide
    }
}

function request($http, cookies) {
    var userLogin = cookies.getUserLogin();
    if (userLogin) var userId = userLogin.UserId;

    function createNewUser(user, onSuccess, onError) {
        $http.post($app.apiUrl + constants.req.SIGN_UP, user)
            .then(onSuccess, onError);
    }

    function login(user, onSuccess, onError) {
        $http.post($app.apiUrl + constants.req.LOGIN, user)
            .then(onSuccess, onError);
    }

    function getListOrders(onSuccess, onError) {
        $http.get($app.apiUrl + constants.req.ORDER + '/' + userId)
            .then(onSuccess, onError);
    }

    function createOrder(order, onSuccess, onError) {
        $http.post($app.apiUrl + constants.req.ORDER, order)
            .then(onSuccess, onError);
    }

    function updateOrder(order, onSuccess, onError) {
        $http.put($app.apiUrl + constants.req.ORDER + '/' + order.OrderId, order)
            .then(onSuccess, onError);
    }

    function registerOrder(reg, onSuccess, onError) {
        $http.post($app.apiUrl + constants.req.REGISTER, reg)
            .then(onSuccess, onError);
    }

    function unRegisterOrder(orderId, shipperId, onSuccess, onError) {
        $http.delete($app.apiUrl + constants.req.REGISTER + '/' + orderId + '/' + shipperId)
            .then(onSuccess, onError);
    }

    function getShopNameByUserId(userId, onSuccess, onError) {
        $http.get($app.apiUrl + constants.req.USER + '/' + userId)
            .then(onSuccess, onError);
    }

    function getOrderRegisteredByShipperId(shipperId, onSuccess, onError) {
        $http.get($app.apiUrl + constants.req.REGISTER + '/getorder/' + shipperId)
            .then(onSuccess, onError);
    }

    function getShipperRegisteredByOrderId(orderId, onSuccess, onError) {
        $http.get($app.apiUrl + constants.req.REGISTER + '/getshipper/' + orderId)
            .then(onSuccess, onError);
    }

    function updateUserInfo(user, onSuccess, onError) {
        $http.put($app.apiUrl + constants.req.USER + '/' + userId, user)
            .then(onSuccess, onError);
    }

    function updatePassword(password, onSuccess, onError) {
        password.UserId = userId;
        $http.post($app.apiUrl + constants.req.USER, password)
            .then(onSuccess, onError);
    }

    return {
        createNewUser: createNewUser,
        login: login,
        getListOrders: getListOrders,
        createOrder: createOrder,
        updateOrder: updateOrder,
        registerOrder: registerOrder,
        unRegisterOrder: unRegisterOrder,
        getShopNameByUserId: getShopNameByUserId,
        getOrderRegisteredByShipperId: getOrderRegisteredByShipperId,
        getShipperRegisteredByOrderId: getShipperRegisteredByOrderId,
        selectShipper: updateOrder,
        updateUserInfo: updateUserInfo,
        updatePassword: updatePassword
    }
}
