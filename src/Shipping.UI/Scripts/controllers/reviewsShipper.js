function reviewsShipper($scope, request, $mdDialog, shipper) {
    $scope.title = String.format(constants.title.REVIEWS_SHIPPER, shipper.name);

    $scope.closeDialog = function () {
        $mdDialog.cancel();
    };

    $scope.stars = [];
    $scope.stared = 0;

    for (var i = 0; i < 10; i++) {
        $scope.stars.push({
            icon: 'star_border',
            direction: 'top',
            tooltip: false
        });
    }

    $scope.starHoverIn = function (index) {
        for (var i = 0; i < 10; i++) {
            if (i < index) $scope.stars[i].icon = 'star';
            else $scope.stars[i].icon = 'star_border';
        }
        $scope.stars[index - 1].tooltip = true;
    };

    $scope.starHoverOut = function () {
        if (!$scope.stared) return;

        for (var i = 0; i < 10; i++) {
            if (i < $scope.stared) $scope.stars[i].icon = 'star';
            else $scope.stars[i].icon = 'star_border';
        }

        $scope.stars[$scope.stared - 1].tooltip = true;
        console.log($scope.stars);
    };

    $scope.starClick = function(index) {
        $scope.stared = index;
    };

    $scope.save = function () {
        console.log($scope.demo.showTooltip);
        if ($scope.form.reviews.$invalid) return;
    }
}
