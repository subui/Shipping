function resetPassword($rootScope, $scope, request, $window, mdToast) {
    $scope.next = function () {
        $scope.checking = true;
        request.checkUsername($scope.username, onSuccess, onError);
    };

    function onSuccess(response) {
        var status = $app.enums.responseStatus;
        var type = $app.enums.requestType;
        var data = response.data;

        if (data.RequestType === type.ResetPassword) {
            if (data.ResponseStatus === status.Success) {
                $scope.checking = false;
                mdToast.show('sdfjsidfjsd', 10000, 'top right');
            }

            if (data.ResponseStatus === status.ErrorUsernameNotExist) {
                mdToast.show(constants.lbl.ERROR_USERNAME_NOT_EXIST, 10000, 'top right');
                $scope.form.resetPassword.username.$setValidity('incorrect', false);
                document.getElementById('username').focus();
            }
        }
    }

    function onError(response) {
        $scope.waiting = false;
        mdToast.show('An error has occurred.', 10000, 'top right');
        console.error(response.data);
    }
}
