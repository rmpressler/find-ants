(function() {
    angular.module('find-ants')
        .service('accountService', AccountService);

    AccountService.$inject = ['server'];
    function AccountService(server) {
        const service = this;
        let subscribers = [];

        service.getAccountBalance = getAccountBalance;
        service.getAccounts = getAccounts;
        service.update = update;
        service.create = create;
        service.subscribe = subscribe;
        service.notify = notify;

        function getAccountBalance(account) {
            return account.transactions.reduce(addValue, 0);

            function addValue(previous, current) {
                return previous + current.amount;
            }
        }

        function getAccounts() {
            return server.request('get', '/accounts')
                .then(data => data.accounts);
        }

        function update(updateObj) {
            return server.request('put', '/accounts', updateObj);
        }

        function create(newAccount) {
            return server.request('post', '/accounts', newAccount)
                .then(data => data.account);
        }

        function subscribe(cb) {
            subscribers.push(cb);
        }

        function notify() {
            subscribers.forEach(cb => cb());
        }
    }
})();