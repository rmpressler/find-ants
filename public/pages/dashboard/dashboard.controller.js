(function() {
    angular.module('find-ants')
        .controller('DashboardController', DashboardController);

    DashboardController.$inject = ['CurrentUser', '$uibModal', 'authenticator', 'userService'];
    function DashboardController(CurrentUser, $uibModal, authenticator, userService) {
        var vm = this;

        // Expose injected user to the view
        vm.currentUser = CurrentUser;
        console.log(vm.currentUser);

        vm.logPaycheck = logPaycheck;

        init();

        function init() {
            userService.on('update', function(user) {
                vm.currentUser = user;
            });
        }

        function logPaycheck() {
            $uibModal.open({
                size: 'lg',
                templateUrl: '/components/modals/paycheck/paycheck.html',
                controller: 'PaycheckController',
                controllerAs: 'pay',
                bindToController: true,
                resolve: {
                    CurrentUser: function() {
                        return vm.currentUser;
                    }
                }
            });
        }
    }
})();
