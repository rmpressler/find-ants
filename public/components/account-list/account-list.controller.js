(function() {
    angular.module('find-ants')
        .controller('AccountListController', AccountListController);

    AccountListController.$inject = ['$uibModal', 'accountService', 'authenticator'];
    function AccountListController($uibModal, accountService, authenticator) {
        var vm = this;

        vm.expenseAccounts = angular.copy(vm.currentUser.accounts);

        vm.logSpending = logSpending;

        init();

        function init() {
            refreshBalances();
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
            }).result.then(function() {
                vm.currentUser = authenticator.getCurrentUser();
                vm.expenseAccounts = angular.copy(vm.currentUser.accounts);
                refreshBalances();
            });
        }

        function refreshBalances() {
            vm.expenseAccounts.forEach(function (account) {
                account.balance = accountService.getAccountBalance(account);
            });
        }
    }
})();