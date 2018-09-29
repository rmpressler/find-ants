(function() {
    angular.module('find-ants')
        .controller('UploadCSVController', UploadCSVController);

    UploadCSVController.$inject = ['server', 'loadingDimmer', '$state'];
    function UploadCSVController(server, loadingDimmer, $state) {
        const $ctrl = this;

        ngOnInit();

        function ngOnInit() {

        }

        $ctrl.activateDimmer = function activateDimmer() {
            loadingDimmer.turnOn();
        };

        $ctrl.parseCsv = function (file, rawData) {
            return server.request('post', '/parse-csv', { input: rawData })
                .then(result => {
                    console.log(angular.copy(result));
                    loadingDimmer.turnOff();
                    $state.go('configure-csv', { parsedCsv: result.output })
                });
        };
    }
})();
