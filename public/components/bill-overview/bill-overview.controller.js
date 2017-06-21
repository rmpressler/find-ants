(function() {
    angular.module('find-ants')
        .controller('BillOverviewController', BillOverviewController);

    BillOverviewController.$inject = ['$uibModal', 'authenticator', 'userService'];
    function BillOverviewController($uibModal, authenticator, userService) {
        var vm = this;

        let currentUser;

        vm.bills = [];

        vm.manageBills = manageBills;

        init();

        function init() {
            userService
                .getUser()
                .then(user => currentUser = user)
                .then(user => vm.bills = user.bills)
                .then(refreshBills);
        }

        function refreshBills() {
            vm.bills = vm.bills.map(bill => {
                var today = new Date();

                bill.date = new Date(today.getFullYear(), today.getMonth(), bill.dayOfMonth);

                return bill;
            });
        }

        function manageBills() {
            $uibModal.open({
                size: 'md',
                templateUrl: '/components/modals/manage-bills/manage-bills.html',
                controller: 'ManageBillsController',
                controllerAs: 'manage',
                bindToController: true,
                resolve: {
                    currentBills: function() {
                        return vm.bills;
                    }
                }
            })
                .result
                .then(newBills => {
                    currentUser.bills = newBills;
                    vm.bills = newBills;

                    var update = {
                        _id: currentUser._id,
                        bills: currentUser.bills
                    };

                    refreshBills();

                    userService.update(update)
                        .catch(function(err) {
                            console.log(err);
                        });
                });
        }
    }
})();