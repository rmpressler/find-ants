(function() {
    angular.module('find-ants')
        .controller('FilterCSVController', FilterCSVController);

    FilterCSVController.$inject = ['$stateParams', '$state'];
    function FilterCSVController($stateParams, $state) {
        const $ctrl = this;

        ngOnInit();

        function ngOnInit() {
            $ctrl.csvRows = $stateParams.parsedCsv;
            $ctrl.csvSettings = $stateParams.csvSettings;
            $ctrl.rowHeaders = $stateParams.rowHeaders;

            if (!$ctrl.csvRows || !$ctrl.csvSettings) {
                return $state.go('upload-csv');
            }

            $ctrl.csvFilters = [];
            $ctrl.newFilter = '';
            $ctrl.locationIndex = _.indexOf('location', $ctrl.rowHeaders);
        }

        $ctrl.addFilter = function addFilter(newFilter) {
            $ctrl.csvFilters.push(newFilter);
            $ctrl.newFilter = '';
        };

        $ctrl.removeFilter = function removeFilter(filter) {
            const index = _.indexOf(filter, $ctrl.csvFilters);
            $ctrl.csvFilters.splice(index, 1);
        };

        $ctrl.applyFilters = function applyFilters() {
            const parsedRows = _.map(row => {
                let location = row[$ctrl.locationIndex];

                _.each(filter => {
                    const index = location.indexOf(filter);
                    if (index > -1) {
                        const pre = location.slice(0, index);
                        const post = location.slice(index + filter.length, location.length);
                        location = (pre + post).trim();
                    }
                }, $ctrl.csvFilters);

                row[$ctrl.locationIndex] = location;
                return row;
            }, $ctrl.csvRows);

            $state.go('trim-csv', {
                parsedCsv: parsedRows,
                rowHeaders: $ctrl.rowHeaders,
                csvSettings: {
                    filters: $ctrl.csvFilters,
                    ...$stateParams.csvSettings
                }
            });
        };
    }
})();
