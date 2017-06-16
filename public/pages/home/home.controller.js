(function() {
    angular.module('find-ants')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$state', 'authenticator', '$http', 'userService'];
    function HomeController($state, authenticator, $http, userService) {
        var vm = this;

        vm.login = login;
        vm.register = register;

        ngOnInit();

        function ngOnInit() {
            vm.loginInfo = {};
            vm.newUser = {
                accounts: [
                    {
                        "name" : "Bill Expense",
                        "transactions" : [ ]
                    }
                ]
            };

            authenticator.getLoginState()
                .then(isLoggedIn => isLoggedIn ? $state.go('dashboard') : false);
        }

        function login(loginInfo) {
            if (!loginInfo.username || !loginInfo.password) {
                return vm.loginError = 'Must provide both username and password';
            }

            return authenticator.login(loginInfo)
                .then(user => $state.go('dashboard'))
                .catch(errorData => vm.loginError = errorData.error);
        }

        function register(newUser) {
            if (!newUser.username) {
                return vm.registerError = 'Please enter a username';
            }

            if (!newUser.password) {
                return vm.registerError = 'Please enter a password';
            }

            if (!newUser.confirmPassword) {
                return vm.registerError = 'Plesae confirm password';
            }

            if (newUser.password !== newUser.confirmPassword) {
                return vm.registerError = 'Passwords do not match';
            }

            userService.register(newUser.username, newUser.password)
                .then(user => $state.go('dashboard'))
                .catch(errorData => vm.registerError = errorData.error);
        }
    }
})();