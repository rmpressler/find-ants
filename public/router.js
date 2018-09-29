(function() {
    angular.module('find-ants')
        .config(StateManager);

    function StateManager($stateProvider) {
        const homeState = {
            name: 'home',
            url: '/',
            templateUrl: '/pages/home/home.html',
            controller: 'HomeController',
            controllerAs: 'home'
        };

        const dashboardState = {
            name: 'dashboard',
            url: '/dashboard',
            templateUrl: '/pages/dashboard/dashboard.html',
            controller: 'DashboardController',
            controllerAs: 'dash'
        };

        const accountHistoryState = {
            name: 'account-history',
            url: '/account-history/:accountId',
            templateUrl: '/pages/account-history/account-history.html',
            controller: 'AccountHistoryController',
            controllerAs: 'hist'
        };

        const uploadCsvState = {
            name: 'upload-csv',
            url: '/upload-csv/upload',
            templateUrl: '/pages/upload-csv/upload-csv.html',
            controller: 'UploadCSVController',
            controllerAs: '$ctrl'
        };

        const configureCsvState = {
            name: 'configure-csv',
            url: '/upload-csv/configure',
            templateUrl: '/pages/configure-csv/configure-csv.html',
            controller: 'ConfigureCSVController',
            controllerAs: '$ctrl',
            params: {
                parsedCsv: null
            }
        };

        const filterCsvState = {
            name: 'filter-csv',
            url: '/upload-csv/filter',
            templateUrl: '/pages/filter-csv/filter-csv.html',
            controller: 'FilterCSVController',
            controllerAs: '$ctrl',
            params: {
                parsedCsv: null,
                rowHeaders: null,
                csvSettings: null
            }
        };

        const trimCsvState = {
            name: 'trim-csv',
            url: '/upload-csv/trim',
            templateUrl: '/pages/trim-csv/trim-csv.html',
            controller: 'TrimCSVController',
            controllerAs: '$ctrl',
            params: {
                parsedCsv: null,
                rowHeaders: null,
                csvSettings: null
            }
        };

        const allocateCsvState = {
            name: 'allocate-csv',
            url: '/upload-csv/allocate',
            templateUrl: '/pages/allocate-csv/allocate-csv.html',
            controller: 'AllocateCSVController',
            controllerAs: '$ctrl',
            params: {
                parsedCsv: null,
                rowHeaders: null,
                csvSettings: null
            }
        };

        $stateProvider.state(homeState);
        $stateProvider.state(dashboardState);
        $stateProvider.state(accountHistoryState);
        $stateProvider.state(uploadCsvState);
        $stateProvider.state(configureCsvState);
        $stateProvider.state(filterCsvState);
        $stateProvider.state(trimCsvState);
        $stateProvider.state(allocateCsvState);
    }
})();
