function mdToast($mdToast) {
    function showToast(textContent, hideDelay, position) {
        $mdToast.show($mdToast.simple()
            .textContent(textContent)
            .hideDelay(hideDelay)
            .position(position));
    }

    return {
        showToast: showToast
    }
}
