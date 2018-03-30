(function() {
    angular.module('find-ants')
        .service('authenticator', Authenticator);

    Authenticator.$inject = ['server', 'userService'];
    function Authenticator(server, userService) {
        let listeners = {};

        this.login = login;
        this.logout = logout;
        this.getLoginState = getLoginState;
        this.on = on;

        function login(loginInfo) {
            // Log in with the server
            return server.request('post', '/authenticate', loginInfo)
                .then(data => {
                    const user = data.user;
                    userService.saveUser(user);
                    emit('login');
                    return user;
                });
        }

        function logout() {
            return server.request('get', '/authenticate/logout')
                .then(() => emit('logout'));
        }

        function getLoginState() {
            return server.request('get', '/authenticate')
                .then(data => {
                    return data.isLoggedIn;
                });
        }

        function on(event, cb) {
            if (!listeners[event]) {
                listeners[event] = [];
            }

            listeners[event].push(cb);
        }

        function emit(event) {
            listeners[event] && listeners[event].forEach(listener => listener());
        }
    }
})();
