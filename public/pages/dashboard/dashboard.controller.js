(function() {
    angular.module('find-ants')
        .controller('DashboardController', DashboardController);

    DashboardController.$inject = ['CurrentUser'];
    function DashboardController(CurrentUser) {
        var vm = this;

        // Expose injected user to the view
        vm.currentUser = CurrentUser;
    }
})();
