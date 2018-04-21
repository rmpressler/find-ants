(function() {
    angular.module('find-ants')
        .service('loadingDimmer', LoadingDimmer);

    LoadingDimmer.$inject = [];
    function LoadingDimmer() {
        const service = this;
        let _activate, _deactivate;

        service.registerDimmer = function registerDimmer(activationFunction, deactivationFunction) {
            _activate = activationFunction;
            _deactivate = deactivationFunction;
        };

        service.turnOn = function turnOn() {
            _activate();
        };

        service.turnOff = function turnOff() {
            _deactivate();
        };
    }
})();
