function profile($scope, request, mdToast, cookies) {
    $scope.user = cookies.getUserLogin();
    $scope.setTitle(constants.title.PROFILE);
    $scope.gender = [
        {
            key: $app.enums.gender.Male,
            value: constants.lbl.MALE
        },
        {
            key: $app.enums.gender.Female,
            value: constants.lbl.FEMALE
        }
    ];

    
}
