(function() {
    angular.module('find-ants')
        .controller('AccountListController', AccountListController);

    AccountListController.$inject = ['$uibModal', 'accountService', 'authenticator', 'userService'];
    function AccountListController($uibModal, accountService, authenticator, userService) {
        var vm = this;

        vm.expenseAccounts = angular.copy(vm.currentUser.accounts);

        vm.logSpending = logSpending;
        vm.getTotal = getTotal;

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
            return vm.expenseAccounts.reduce(function(previous, current) {
                return previous + current.balance;
            }, 0);
        }

        function refreshBalances() {
            vm.expenseAccounts.forEach(function (account) {
                account.balance = accountService.getAccountBalance(account);
            });
        }

        function refreshController(user) {
            vm.currentUser = user;
            vm.expenseAccounts = angular.copy(vm.currentUser.accounts);
            refreshBalances();
        }
    }
})();
