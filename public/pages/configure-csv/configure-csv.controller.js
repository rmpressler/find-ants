(function() {
    angular.module('find-ants')
        .controller('ConfigureCSVController', ConfigureCSVController);

    ConfigureCSVController.$inject = ['$stateParams', '$state'];
    function ConfigureCSVController($stateParams, $state) {
        const $ctrl = this;

        ngOnInit();

        function ngOnInit() {
            $ctrl.csvRows = $stateParams.parsedCsv;

            if (!$ctrl.csvRows) {
                return $state.go('upload-csv');
            }

            $ctrl.csvHasHeaderRow = false;
            $ctrl.firstRow = $ctrl.csvRows[0];
            $ctrl.fields = [
                {
                    name: 'Date',
                    value: 'date'
                },
                {
                    name: 'Description',
                    value: 'description'
                },
                {
                    name: 'Location',
                    value: 'location'
                },
                {
                    name: 'Amount',
                    value: 'amount'
                },
                {
                    name: 'Debit',
                    value: 'debit'
                },
                {
                    name: 'Credit',
                    value: 'credit'
                }
            ];
            $ctrl.fieldForColumn = [];
            $ctrl.saveSettings = false;
        }

        $ctrl.isHeaderRow = function isHeaderRow(row) {
            return _.indexOf(row, $ctrl.csvRows) === 0 && $ctrl.csvHasHeaderRow;
        };

        $ctrl.assignColumns = function assignColumns() {
            if ($ctrl.csvHasHeaderRow) {
                $ctrl.csvRows = $ctrl.csvRows.slice(1);
            }

            const parsedCsv = _.map(row => {
                const newRow = [];
                for (i = 0; i < row.length; i++) {
                    if ($ctrl.fieldForColumn[i]) {
                        newRow.push(row[i]);
                    }
                }
                return newRow;
            }, $ctrl.csvRows);

            $state.go('filter-csv', {
                parsedCsv,
                rowHeaders: _.compact($ctrl.fieldForColumn),
                csvSettings: {
                    hasHeaderRow: $ctrl.csvHasHeaderRow,
                    columnAssignments: $ctrl.fieldForColumn
                }
            });
        };
    }
})();
