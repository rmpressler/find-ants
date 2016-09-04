(function() {
    angular.module('find-ants')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$state', 'authenticator'];
    function HomeController($state, authenticator) {
        var vm = this;

        vm.login = login;

        function login(username) {
            return authenticator.login('username', username)
                .then(function() {
                    $state.go('dashboard');
                });
        }
    }
})();