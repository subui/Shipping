function request($http) {
    function createNewUser(user, onSuccess, onError) {
        $http.post($app.url + 'signup', user)
            .then(onSuccess, onError);
    }

    function login(user, onSuccess, onError) {
        $http.post($app.url + 'login', user)
            .then(onSuccess, onError);
    }

    function getListOrders(onSuccess, onError) {
        $http.get($app.url + 'order')
            .then(onSuccess, onError);
    }

    return {
        createNewUser: createNewUser,
        login: login,
        getListOrders: getListOrders
    }
}
