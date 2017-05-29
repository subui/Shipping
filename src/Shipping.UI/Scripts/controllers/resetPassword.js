function resetPassword($scope, request, $window, $mdDialog, mdToast) {
    var step = 1;
    $scope.stepContent = 'step1.html';

    $scope.nextToStep2 = function () {
        if ($scope.$$childHead.form.resetPassword.$invalid) return;
        $scope.waiting = true;
        $scope.username = $scope.$$childHead.username;
        request.checkUsername($scope.username, onSuccess, onError);
    };

    $scope.nextToStep3 = function () {
        if ($scope.$$childHead.form.resetPassword.$invalid) return;
        $scope.waiting = true;
        $scope.email = $scope.$$childHead.email;
        request.checkEmail($scope.username, $scope.$$childHead.email, onSuccess, onError);
    };

    $scope.reset = function () {
        if ($scope.$$childHead.form.resetPassword.$invalid) return;
        $scope.waiting = true;
        $scope.password = $scope.$$childHead.password;
        request.resetPassword(new $app.entities.ResetPassword($scope.username, $scope.email, $scope.password), onSuccess, onError);
    };

    $scope.back = function () {
        step--;
        $scope.stepContent = 'step1.html';
    };

    function onSuccess(response) {
        var status = $app.enums.responseStatus;
        var type = $app.enums.requestType;
        var data = response.data;

        if (data.RequestType === type.ResetPassword) {
            $scope.waiting = false;
            if (data.ResponseStatus === status.Success) {
                step++;
                step <= 3 ? $scope.stepContent = String.format('step{0}.html', step)
                          : $mdDialog.show(
                                $mdDialog.alert()
                                    .title(constants.title.NOTIFY)
                                    .textContent(constants.lbl.RESET_PASSWORD_SUCCESS)
                                    .ok(constants.btn.OK)
                            ).then(function() {
                                $window.location.href = '../login.html';
                            });
            }

            if (data.ResponseStatus === status.ErrorUsernameNotExist) {
                mdToast.show(constants.lbl.ERROR_USERNAME_NOT_EXIST, 10000, 'top right');
                $scope.$$childHead.form.resetPassword.username.$setValidity('incorrect', false);
                document.getElementById('username').focus();
            }

            if (data.ResponseStatus === status.ErrorEmailIncorrect) {
                mdToast.show(constants.lbl.ERROR_EMAIL_INCORRECT, 10000, 'top right');
                $scope.$$childHead.form.resetPassword.email.$setValidity('incorrect', false);
                document.getElementById('email').focus();
            }
        }
    }

    function onError(response) {
        $scope.waiting = false;
        mdToast.show(response.data.ExceptionMessage, 10000, 'top right');
        console.error(response.data);
    }
}
