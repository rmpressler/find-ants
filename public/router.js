(function() {
    angular.module('find-ants')
        .config(StateManager);

    function StateManager($stateProvider) {
        var homeState = {
            name: 'home',
            url: '/',
            templateUrl: '/pages/home/home.html',
            controller: 'HomeController',
            controllerAs: 'home'
        };

        var dashboardState = {
            name: 'dashboard',
            url: '/dashboard',
            templateUrl: '/pages/dashboard/dashboard.html',
            controller: 'DashboardController',
            controllerAs: 'dash'
        };

        var accountHistoryState = {
            name: 'account-history',
            url: '/account-history/:accountId',
            templateUrl: '/pages/account-history/account-history.html',
            controller: 'AccountHistoryController',
            controllerAs: 'hist'
        };

        $stateProvider.state(homeState);
        $stateProvider.state(dashboardState);
        $stateProvider.state(accountHistoryState);
    }
})();
