(function() {
    angular.module('find-ants')
        .directive('accountList', AccountList);

    function AccountList() {
        return {
            restrict: 'E',
            scope: {},
            templateUrl: '/components/account-list/account-list.html',
            controller: 'AccountListController',
            controllerAs: 'accList'
        };
    }
})();