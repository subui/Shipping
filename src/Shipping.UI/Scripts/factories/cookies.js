function cookies($cookies) {
    function setUserLogin(username) {
        $cookies.put('userLogin', username, { path: '/' });
    }

    function getUserLogin() {
        return $cookies.get('userLogin', { path: '/' });
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
