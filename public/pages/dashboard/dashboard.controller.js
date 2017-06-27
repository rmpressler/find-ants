(function() {
    angular.module('find-ants')
        .controller('DashboardController', DashboardController);

    DashboardController.$inject = ['$uibModal', 'userService', '$filter'];
    function DashboardController($uibModal, userService, $filter) {
        var vm = this;

        vm.logPaycheck = logPaycheck;

        init();

        function init() {
            // Expose injected user to the view
            userService.getUser()
                .then(user => {
                    vm.currentUser = user;
                });
        }

        function updateLastTen() {
            // Reimplement later
            // var allTransactions = [];

            // vm.currentUser.accounts.forEach(function (account) {
            //     var transactions = account.transactions.map(function (transaction) {
            //         transaction.account = account;
            //         return transaction;
            //     });
            //     allTransactions = allTransactions.concat(transactions);
            // });

            // var ordered = $filter('orderBy')(allTransactions, '-date');
            // vm.lastTen = ordered.slice(0, 10);
        }

        function logPaycheck() {
            $uibModal.open({
                size: 'lg',
                templateUrl: '/components/modals/paycheck/paycheck.html',
                controller: 'PaycheckController',
                controllerAs: 'pay',
                bindToController: true,
                resolve: {
                    CurrentUser: () => vm.currentUser
                }
            });
        }
    }
})();
