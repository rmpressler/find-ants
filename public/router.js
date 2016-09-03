(function() {
    angular.module('find-ants')
        .config(StateManager);

    function StateManager($stateProvider) {
        var homeState = {
            name: 'home',
            url: '/',
            templateUrl: '/pages/home.html'
        };

        var dashboardState = {
            name: 'dashboard',
            url: '/dashboard',
            templateUrl: '/pages/dashboard/dashboard.html',
            controller: 'DashboardController',
            controllerAs: 'dash'
        };

        $stateProvider.state(homeState);
        $stateProvider.state(dashboardState);
    }
})();
