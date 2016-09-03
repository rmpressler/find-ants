(function() {
    angular.module('find-ants')
        .controller('AccountListController', AccountListController);

    function AccountListController() {
        var vm = this;

        vm.expenseAccounts = [
            {
                name: 'General Expense',
                balance: 500
            },
            {
                name: 'Gas Expense',
                balance: 70
            },
            {
                name: 'Food Expense',
                balance: 40
            }
        ];
    }
})();