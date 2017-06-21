(function() {
    angular.module('find-ants')
        .controller('AccountListController', AccountListController);

    AccountListController.$inject = ['$uibModal', 'accountService', 'userService', 'addAccountModal'];
    function AccountListController($uibModal, accountService, userService, addAccountModal) {
        var vm = this;

        let currentUser;

        vm.logSpending = logSpending;
        vm.getTotal = getTotal;
        vm.addAccount = addAccount;

        init();

        function init() {
            getUser();
            userService.on('update', getUser);
        }

        function getUser() {
            userService
                .getUser()
                .then(user => currentUser = user)
                .then(refreshBalances);
        }

        function logSpending(account) {
            $uibModal.open({
                templateUrl: '/components/modals/log-spending/log-spending.html',
                controller: 'LogSpendingController',
                controllerAs: 'spend'
            })
                .result.then(newSpending => {
                    account.transactions = account.transactions.concat(newSpending);
                    userService
                        .update({
                            _id: currentUser._id,
                            accounts: currentUser.accounts
                        })
                        .then(refreshBalances);
                });
        }

        function getTotal() {
            return vm.expenseAccounts ? vm.expenseAccounts.reduce(function(previous, current) {
                return previous + current.balance;
            }, 0) : 0;
        }

        function refreshBalances() {
            vm.expenseAccounts = currentUser.accounts;
            vm.expenseAccounts && vm.expenseAccounts.forEach(function (account) {
                account.balance = accountService.getAccountBalance(account);
            });
        }

        function addAccount() {
            addAccountModal
                .open()
                .then(newAccount => {
                    currentUser.accounts.push(newAccount);
                    userService.update({
                        _id: currentUser._id,
                        accounts: currentUser.accounts
                    });
                })
                .then(refreshBalances);
        }
    }
})();
