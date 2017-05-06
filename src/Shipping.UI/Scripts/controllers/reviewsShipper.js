function reviewsShipper($scope, request, $mdDialog, shipper) {
    $scope.title = String.format(constants.title.REVIEWS_SHIPPER, shipper.name);

    $scope.closeDialog = function () {
        $mdDialog.cancel();
    };

    $scope.star = [];
    $scope.stared = 0;

    for (var i = 0; i < 10; i++) {
        $scope.star.push('star_border');
    }

    $scope.starHoverIn = function(index) {
        for (var i = 0; i < 10; i++) {
            if (i <= index) $scope.star[i] = 'star';
            else $scope.star[i] = 'star_border';
        }
    };

    $scope.starHoverOut = function() {
        for (var i = 0; i < 10; i++) {
            if (i < $scope.stared) $scope.star[i] = 'star';
            else $scope.star[i] = 'star_border';
        }
    };

    $scope.starClick = function(index) {
        $scope.stared = index + 1;
        for (var i = 0; i <= index; i++) {
            $scope.star[i] = 'star';
        }
    };

    $scope.save = function() {
        if ($scope.form.reviews.$invalid) return;
    }
}