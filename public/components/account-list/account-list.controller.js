(function() {
    angular.module('find-ants')
        .controller('AccountListController', AccountListController);

    AccountListController.$inject = ['$uibModal', 'accountService', 'userService', 'addAccountModal'];
    function AccountListController($uibModal, accountService, userService, addAccountModal) {
        var vm = this;

        vm.expenseAccounts = angular.copy(vm.currentUser.accounts);

        vm.logSpending = logSpending;
        vm.getTotal = getTotal;
        vm.addAccount = addAccount;

        init();

        function init() {
            refreshBalances();

            userService.on('update', function(user) {
                refreshController(user);
            });
        }

        function logSpending(accountId) {
            $uibModal.open({
                templateUrl: '/components/modals/log-spending/log-spending.html',
                controller: 'LogSpendingController',
                controllerAs: 'spend',
                bindToController: true,
                resolve: {
                    currentUser: function() {
                        return vm.currentUser;
                    },
                    accountId: function() {
                        return accountId;
                    }
                }
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

        function refreshController(user) {
            vm.currentUser = user;
            vm.expenseAccounts = angular.copy(vm.currentUser.accounts);
            refreshBalances();
        }

        function addAccount() {
            addAccountModal
                .open()
                .then(newAccount => {
                    vm.currentUser.accounts.push(newAccount);
                    userService.update({
                        _id: vm.currentUser._id,
                        accounts: vm.currentUser.accounts
                    });
                });
        }
    }
})();
