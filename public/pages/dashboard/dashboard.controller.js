(function() {
    angular.module('find-ants')
        .controller('DashboardController', DashboardController);

    function DashboardController() {
        var vm = this;

        vm.currentLedger = 'General Expense';
    }
})();
