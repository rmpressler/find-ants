(function() {
    angular.module('find-ants')
        .config(StateManager);

    function StateManager($stateProvider) {
        var homeState = {
            name: 'home',
            url: '/',
            templateUrl: '/views/home.html'
        };

        var ledgerState = {
            name: 'ledger',
            url: '/ledger',
            templateUrl: '/views/ledger.html'
        };

        $stateProvider.state(homeState);
        $stateProvider.state(ledgerState);
    }
})();
