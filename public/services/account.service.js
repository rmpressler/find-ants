(function() {
    angular.module('find-ants')
        .factory('accountService', AccountService);

    function AccountService() {
        return {
            getAccountBalance: getAccountBalance
        };

        function getAccountBalance(account) {
            return account.transactions.reduce(addValue, 0);

            function addValue(previous, current) {
                return previous + current.amount;
            }
        }
    }
})();