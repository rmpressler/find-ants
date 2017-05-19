(function() {
    angular.module('find-ants')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$state', 'authenticator', '$http'];
    function HomeController($state, authenticator, $http) {
        var vm = this;

        vm.login = login;

        ngOnInit();

        function ngOnInit() {
            vm.loginInfo = {};
        }

        function login(loginInfo) {
            if (!loginInfo.username || !loginInfo.password) {
                return vm.error = 'Must provide both username and password';
            }

            return authenticator.login(loginInfo)
                .then(user => $state.go('dashboard'))
                .catch(error => vm.error = error);
        }
    }
})();