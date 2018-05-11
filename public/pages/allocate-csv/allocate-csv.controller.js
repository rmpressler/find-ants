(function() {
    angular.module('find-ants')
        .controller('AllocateCSVController', AllocateCSVController);

    AllocateCSVController.$inject = ['$stateParams', '$state', 'accountService', '$q'];
    function AllocateCSVController($stateParams, $state, accountService, $q) {
        const $ctrl = this;

        $ctrl.allocateTransactions = function allocateTransactions() {
            const accountIdIndex = $ctrl.accountIdIndex;
            const descriptionIndex = $ctrl.descriptionIndex;
            const locationIndex = _.indexOf('location', $ctrl.rowHeaders);
            const dateIndex = _.indexOf('date', $ctrl.rowHeaders);
            const debitIndex = _.indexOf('debit', $ctrl.rowHeaders);
            const creditIndex = _.indexOf('credit', $ctrl.rowHeaders);

            const promises = [];

            _.each(row => {
                const account = _.find({_id: row[accountIdIndex]}, $ctrl.accounts);

                const transaction = {
                    location: row[locationIndex],
                    date: row[dateIndex],
                    amount: 0 - Math.abs(Number(row[debitIndex])) + Math.abs(Number(row[creditIndex])),
                    description: row[descriptionIndex]
                };

                account.transactions.push(transaction);
            }, $ctrl.csvRows);

            _.each(account => {
                const promise = accountService.update(_.pick(['_id', 'transactions'], account))
                    .catch(console.log);
                promises.push(promise);
            }, $ctrl.accounts);

            $q.all(promises)
                .then(() => $state.go('dashboard'));
        };

        $ctrl.getTruncatedLocation = function getTruncatedLocation(location) {
            return location.length > 35 ? location.slice(0, 35) + '...' : location;
        }

        function ngOnInit() {
            $ctrl.csvRows = $stateParams.parsedCsv;
            $ctrl.csvSettings = $stateParams.csvSettings;
            $ctrl.rowHeaders = $stateParams.rowHeaders;

            if (!$ctrl.csvRows || !$ctrl.csvSettings) {
                return $state.go('upload-csv');
            }

            console.log(angular.copy($stateParams));

            $ctrl.accountIdIndex = $ctrl.rowHeaders.length;
            $ctrl.descriptionIndex = $ctrl.rowHeaders.length + 1;

            accountService.getAccounts()
                .then(accounts => $ctrl.accounts = accounts);
        }

        ngOnInit();
    }
})();
