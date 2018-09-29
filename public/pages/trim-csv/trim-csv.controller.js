(function() {
    angular.module('find-ants')
        .controller('TrimCSVController', TrimCSVController);

    TrimCSVController.$inject = ['$stateParams', '$state'];
    function TrimCSVController($stateParams, $state) {
        const $ctrl = this;

        $ctrl.resetAndSelectRows = function resetAndSelectRows() {
            _.each(row => {
                row.isSelected = false;
            }, $ctrl.csvRows);

            $ctrl.startRow = null;
            $ctrl.endRow = null;
        };

        $ctrl.setRow = function setRow(row) {
            if ($ctrl.startRow === null) {
                $ctrl.startRow = row;
                row.isSelected = true;
            } else if ($ctrl.endRow === null) {
                $ctrl.endRow = row;

                const startIndex = _.indexOf($ctrl.startRow, $ctrl.csvRows);
                const endIndex = _.indexOf($ctrl.endRow, $ctrl.csvRows);

                _.each(row => {
                    const index = _.indexOf(row, $ctrl.csvRows);
                    if (index >= startIndex && index <= endIndex) {
                        row.isSelected = true;
                    }

                }, $ctrl.csvRows);
            }
        };

        $ctrl.deselectRow = function deselectRow(row) {
            row.isSelected = false;
        };

        $ctrl.selectTransactions = function selectTransactions() {
            const selectedRows = _.filter({isSelected: true}, $ctrl.csvRows);

            console.log($ctrl.rowHeaders);
            $state.go('allocate-csv', {
                parsedCsv: selectedRows,
                rowHeaders: $ctrl.rowHeaders,
                csvSettings: $ctrl.csvSettings
            });
        };

        function ngOnInit() {
            $ctrl.csvRows = $stateParams.parsedCsv;
            $ctrl.csvSettings = $stateParams.csvSettings;
            $ctrl.rowHeaders = $stateParams.rowHeaders;

            if (!$ctrl.csvRows || !$ctrl.csvSettings) {
                return $state.go('upload-csv');
            }

            $ctrl.resetAndSelectRows();
        }

        ngOnInit();
    }
})();
