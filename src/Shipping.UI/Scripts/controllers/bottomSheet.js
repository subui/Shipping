function bottomSheet($scope, $mdBottomSheet, shipper) {
    $scope.subheader = String.format(constants.lbl.SHIPPER_INFO, shipper.FullName);
    $scope.shipper = shipper;
}
