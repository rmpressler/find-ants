(function() {
    angular.module('find-ants')
        .directive('billOverview', BillOverview);

    function BillOverview() {
        return {
            restrict: 'E',
            scope: {},
            templateUrl: '/components/bill-overview/bill-overview.html',
            controller: 'BillOverviewController',
            controllerAs: 'billOverview'
        }
    }
})();