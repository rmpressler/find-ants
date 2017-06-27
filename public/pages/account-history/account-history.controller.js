(function() {
    angular.module('find-ants')
        .controller('AccountHistoryController', AccountHistoryController);

    AccountHistoryController.$inject = ['accountService', '$stateParams'];
    function AccountHistoryController(accountService, $stateParams) {
        let vm = this;
        let currentUser;

        ngOnInit();

        function ngOnInit() {
            accountService
                .getAccounts()
                .then(accounts => {
                    vm.transactions = accounts.filter(function(account) {
                        return account._id === $stateParams.accountId;
                    })[0].transactions;

                    vm.balances = [];

                    refreshBalances();
                });
        }

        function refreshBalances() {
            var i,
                j,
                sorted = angular.copy(vm.transactions),
                thisDate,
                nextDate,
                temp;

            for (i = 0; i < sorted.length; i++) {
                for (j = 0; j < sorted.length - i - 1; j++) {
                    thisDate = new Date(sorted[j].date);
                    nextDate = new Date(sorted[j + 1].date);
                    if (nextDate.getTime() < thisDate.getTime()) {
                        temp = angular.copy(sorted[j + 1]);
                        sorted[j + 1] = angular.copy(sorted[j]);
                        sorted[j] = temp;
                    }
                }
            }

            var balances = [sorted[0].amount];

            for (i = 1; i < sorted.length; i++) {
                balances.push(balances[i - 1] + sorted[i].amount);
            }

            vm.balances = balances;
        }
    }
})();