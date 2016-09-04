(function() {
    angular.module('find-ants')
        .controller('ManageBillsController', ManageBillsController);

    ManageBillsController.$inject = ['currentUser', '$uibModalInstance', 'userService'];
    function ManageBillsController(currentUser, $uibModalInstance, userService) {
        var vm = this;

        vm.bills = angular.copy(currentUser.bills);

        vm.close = close;
        vm.addBill = addBill;
        vm.removeBill = removeBill;
        vm.saveBills = saveBills;

        function close() {
            $uibModalInstance.close();
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
            var update = {
                _id: currentUser._id,
                bills: vm.bills
            };

            userService.update(update)
                .then(function (updatedUser) {
                    currentUser = updatedUser;
                    close();
                })
                .catch(function(err) {
                    console.log(err);
                });
        }
    }
})();