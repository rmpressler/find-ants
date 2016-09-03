(function() {
    angular.module('find-ants')
        .directive('billOverview', BillOverview);

    function BillOverview() {
        return {
            restrict: 'E',
            templateUrl: '/components/bill-overview/bill-overview.html',
            controller: 'BillOverviewController',
            controllerAs: 'billOverview'
        }
    }
})();