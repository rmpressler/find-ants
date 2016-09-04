(function() {
    angular.module('find-ants')
        .controller('BillOverviewController', BillOverviewController);

    BillOverviewController.$inject = ['$uibModal', 'authenticator'];
    function BillOverviewController($uibModal, authenticator) {
        var vm = this;

        vm.bills = [];

        vm.manageBills = manageBills;

        init();

        function init() {
            vm.bills = angular.copy(vm.currentUser.bills);

            refreshBills();
        }

        function refreshBills() {
            vm.bills = vm.bills.map(getDates);

            function getDates(bill) {
                var today = new Date();

                bill.date = new Date(today.getFullYear(), today.getMonth(), bill.dayOfMonth);

                return bill;
            }
        }

        function manageBills() {
            $uibModal.open({
                size: 'md',
                templateUrl: '/components/modals/manage-bills/manage-bills.html',
                controller: 'ManageBillsController',
                controllerAs: 'manage',
                bindToController: true,
                resolve: {
                    currentUser: function() {
                        return vm.currentUser;
                    }
                }
            }).result.then(function() {
                vm.currentUser = authenticator.getCurrentUser();
                vm.bills = angular.copy(vm.currentUser.bills);
                refreshBills();
            });
        }
    }
})();