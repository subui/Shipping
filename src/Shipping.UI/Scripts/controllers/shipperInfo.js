function shipperInfo($scope, request, $mdDialog, shipper) {
    $scope.shipper = shipper;
    $scope.title = String.format(constants.title.SHIPPER_INFO, shipper.FullName);
    $scope.gender = shipper.Gender === $app.enums.gender.Male ? constants.lbl.MALE : constants.lbl.FEMALE;
    $scope.birthDay = $app.formatDateTime(shipper.BirthDay).substring(0, 10);

    request.getNumberOfReviews(shipper.UserId, onSuccess, onError);

    $scope.closeDialog = function () {
        $mdDialog.hide();
    };

    $scope.showReviews = function() {
        $scope.class = 'show-reviews';
        $scope.layout = 'row';
    }

    function onSuccess(response) {
        $scope.waiting = false;

        var status = $app.enums.responseStatus;
        var type = $app.enums.requestType;
        var data = response.data;

        if (data.ResponseStatus === status.Success) {
            if (data.RequestType === type.Reviews) {
                $scope.reviews = String.format(constants.lbl.REVIEWS, data.Data);
            }
        }
    }

    function onError(response) {
        $scope.waiting = false;
        mdToast.show(constants.lbl.ERROR, 1000, 'top right');
        console.error(response.data);
    }
}