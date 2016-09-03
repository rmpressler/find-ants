(function() {
    angular.module('find-ants')
        .controller('BillOverviewController', BillOverviewController);

    function BillOverviewController() {
        var vm = this;

        vm.upcomingBills = [
            {
                name: 'Phone',
                date: new Date(2016, 8, 6),
                amount: 112,
                allocated: true
            },
            {
                name: 'Phone',
                date: new Date(2016, 8, 7),
                amount: 112,
                allocated: true
            },
            {
                name: 'Phone',
                date: new Date(2016, 8, 4),
                amount: 112,
                allocated: true
            }
        ];
    }
})();