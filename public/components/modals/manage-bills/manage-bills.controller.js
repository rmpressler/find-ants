(function() {
    angular.module('find-ants')
        .controller('ManageBillsController', ManageBillsController);

    ManageBillsController.$inject = ['currentBills', '$uibModalInstance', 'userService'];
    function ManageBillsController(currentBills, $uibModalInstance, userService) {
        var vm = this;

        vm.bills = angular.copy(currentBills);

        vm.close = close;
        vm.addBill = addBill;
        vm.removeBill = removeBill;
        vm.saveBills = saveBills;

        function close() {
            $uibModalInstance.dismiss();
        }

        function addBill() {
            var emptyBill = {
                dayOfMonth: (new Date()).getDate(),
                name: '',
                amount: 0.00
            };
            vm.bills.push(emptyBill);
        }

        function removeBill(bill) {
            vm.bills.splice(vm.bills.indexOf(bill), 1);
        }

        function saveBills() {
            $uibModalInstance.close(vm.bills);
        }
    }
})();