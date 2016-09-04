(function() {
    angular.module('find-ants')
        .controller('BillOverviewController', BillOverviewController);

    BillOverviewController.$inject = [];
    function BillOverviewController() {
        var vm = this;

        vm.bills = [];

        init();

        function init() {
            vm.bills = angular.copy(vm.currentUser.bills);

            refreshBills();
        }

        function refreshBills() {
            vm.bills = vm.bills.map(getDates);

            function getDates(bill) {
                var existing = new Date(bill.date);
                var today = new Date();

                bill.date = new Date(today.getFullYear(), today.getMonth(), existing.getDate());

                return bill;
            }
        }
    }
})();