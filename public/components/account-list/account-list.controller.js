(function() {
    angular.module('find-ants')
        .controller('AccountListController', AccountListController);

    AccountListController.$inject = ['$uibModal', 'accountService', 'userService', 'addAccountModal'];
    function AccountListController($uibModal, accountService, userService, addAccountModal) {
        var vm = this;

        vm.logSpending = logSpending;
        vm.getTotal = getTotal;
        vm.addAccount = addAccount;

        init();

        function init() {
            getAccounts();
            accountService.subscribe(getAccounts);
        }

        function getAccounts() {
            accountService
                .getAccounts()
                .then(accounts => vm.expenseAccounts = accounts)
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
                    accountService
                        .logTransactions(account._id, newSpending)
                        .then(refreshBalances);
                });
        }

        function getTotal() {
            return vm.expenseAccounts ? vm.expenseAccounts.reduce(function(previous, current) {
                return previous + current.balance;
            }, 0) : 0;
        }

        function refreshBalances() {
            vm.expenseAccounts && vm.expenseAccounts.forEach(function (account) {
                account.balance = accountService.getAccountBalance(account);
            });
        }

        function addAccount() {
            addAccountModal
                .open()
                .then(accountService.create)
                .then(newAccount => {
                    vm.expenseAccounts.push(newAccount);
                    return newAccount._id;
                })
                .then(userService.addAccount)
                .then(refreshBalances);
        }
    }
})();
