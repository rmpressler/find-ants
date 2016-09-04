(function() {
    angular.module('find-ants', ['ui.router', 'ui.bootstrap']);

    // Force initialize ui-router
    angular.module('find-ants').config(setHTML5);

    setHTML5.$inject = ["$locationProvider"];
    function setHTML5($locationProvider) {
        $locationProvider.html5Mode(true);
    }
})();
