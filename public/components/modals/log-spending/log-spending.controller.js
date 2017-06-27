(function() {
    angular.module('find-ants')
        .controller('LogSpendingController', LogSpendingController);

    LogSpendingController.$inject = ['$uibModalInstance'];
    function LogSpendingController($uibModalInstance) {
        var vm = this;

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

            $uibModalInstance.close(newEntries);
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