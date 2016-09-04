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
            controllerAs: 'dash',
            resolve: {
                CurrentUser: authenticationResolve
            }
        };

        $stateProvider.state(homeState);
        $stateProvider.state(dashboardState);

        function authenticationResolve(authenticator) {
            return authenticator.getCurrentUser();
        }
    }
})();
