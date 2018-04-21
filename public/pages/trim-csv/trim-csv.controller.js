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
