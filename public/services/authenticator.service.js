(function() {
    angular.module('find-ants')
        .factory('authenticator', Authenticator);

    Authenticator.$inject = ['userService'];
    function Authenticator(userService) {
        return {
            login: login,
            getCurrentUser: getCurrentUser
        };

        function login(username) {
            return userService.getBy('username', username)
                .then(function(user) {
                    window.localStorage.setItem('user', JSON.stringify(user));
                    return user;
                });
        }

        function getCurrentUser() {
            return JSON.parse(window.localStorage.getItem('user'));
        }
    }
})();