(function() {
    angular.module('find-ants')
        .directive('faHeader', Header)
        .controller('HeaderCtrl', HeaderCtrl);

    function Header() {
        return {
            restrict: 'E',
            templateUrl: 'components/header/header.html',
            controller: HeaderCtrl,
            controllerAs: 'ctrl'
        };
    }

    HeaderCtrl.$inject = ['authenticator', '$state'];
    function HeaderCtrl(authenticator, $state) {
        const ctrl = this;

        ctrl.logout = logout;

        init();

        function init() {
            authenticator.on('login', () => ctrl.loggedIn = true);
            authenticator.on('logout', () => ctrl.loggedIn = false);

            authenticator.getLoginState()
                .then(loggedIn => ctrl.loggedIn = loggedIn);
        }

        function logout() {
            authenticator.logout()
                .then(() => $state.go('home'));
        }
    }
})();
