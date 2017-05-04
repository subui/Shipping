function changePassword($scope, request, mdToast) {
    $scope.setTitle(constants.title.CHANGE_PASSWORD);

    $scope.changePassword = function () {
        if ($scope.form.changePassword.$invalid) return;

        $scope.waiting = true;
        request.updatePassword(new $app.entities.UpdatePassword(null, $scope.currentPassword, $scope.newPassword), onSuccess, onError);
    }

    function onSuccess(response) {
        $scope.waiting = false;

        var status = $app.enums.responseStatus;
        var type = $app.enums.requestType;
        var data = response.data;

        if (data.RequestType === type.User) {
            if (data.ResponseStatus === status.Success) {
                mdToast.show(constants.lbl.PASSWORD_CHANGED);
            }

            if (data.ResponseStatus === status.ErrorPasswordIncorrect) {
                mdToast.show(constants.lbl.ERROR_PASSWORD_INCORRECT);
                $scope.form.changePassword.currentPassword.$setValidity('incorrect', false);
                document.getElementById('currentPassword').focus();
            }
        }
    }

    function onError(response) {
        $scope.waiting = false;
        mdToast.show(constants.lbl.ERROR, 1000, 'top right');
        console.error(response.data);
    }
}
