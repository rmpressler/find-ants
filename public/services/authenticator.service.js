(function() {
    angular.module('find-ants')
        .factory('authenticator', Authenticator);

    Authenticator.$inject = ['server', 'userService'];
    function Authenticator(server, userService) {
        return {
            login: login,
            getLoginState: getLoginState
        };

        function login(loginInfo) {
            // Log in with the server
            return server.request('post', '/authenticate', loginInfo)
                .then(data => {
                    user = data.user;
                    userService.saveUser(user);
                    return user;
                });
        }

        function getLoginState() {
            return server.request('get', '/authenticate')
                .then(data => {
                    return data.isLoggedIn;
                });
        }
    }
})();