function toastTemplate($scope, $mdToast, textContent) {
    $scope.textContent = textContent;
    $scope.closeToast = function() {
        $mdToast.hide();
    }
}
