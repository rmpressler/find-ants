(function() {
    angular.module('find-ants')
        .controller('LogSpendingController', LogSpendingController);

    LogSpendingController.$inject = ['$uibModalInstance', 'userService', 'currentUser', 'accountId'];
    function LogSpendingController($uibModalInstance, userService, currentUser, accountId) {
        var vm = this;

        vm.accounts = currentUser.accounts;
        vm.loggedItems = [];

        vm.close = close;
        vm.submit = submit;
        vm.addRow = pushNewRow;

        init();

        function init() {
            var i;

            for (i = 0; i < 5; i++) {
                pushNewRow();
            }
        }

        function close() {
            $uibModalInstance.dismiss();
        }

        function submit(newEntries) {
            newEntries = newEntries.filter(function(entry) {
                return entry.description !== '' || entry.amount !== 0;
            });

            newEntries.forEach(function(entry) {
                entry.amount = 0 - entry.amount;
            });

            var userUpdate = {
                _id: currentUser._id,
                accounts: currentUser.accounts
            };

            userUpdate.accounts.forEach(function(account) {
                if (account._id === accountId) {
                    account.transactions = account.transactions.concat(newEntries);
                }
            });

            userService.update(userUpdate)
                .then(function() {
                    $uibModalInstance.close();
                });
        }

        function pushNewRow() {
            var emptyRow = {
                date: new Date(),
                description: '',
                amount: 0
            };

            vm.loggedItems.push(emptyRow);
        }
    }
})();