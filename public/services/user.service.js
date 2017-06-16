(function() {
    angular.module('find-ants')
        .service('userService', UserService);

    UserService.$inject = ['dataService', '$q', 'server'];
    function UserService(dataService, $q, server) {
        let service = this;

        let callbacks = {};
        let user;

        service.on = on;

        // New API
        service.saveUser = saveUser;
        service.getUser = getUser;
        service.update = update;
        service.register = register;

        function getUser() {
            if (user) {
                return $q.resolve(user);
            }

            return server.request('get', '/user')
                .then(data => data.user);
        }

        function register(username, password) {
            if (!username || !password) {
                return $q.reject('Username and password are required');
            }

            const newUser = {
                username,
                password,
                accounts: [],
                bills: []
            };

            return server.request('post', '/user', newUser)
                .then(data => {
                    user = data.user;
                    return user;
                });
        }

        function update(updateObj) {
            return server.request('put', '/user', updateObj)
                .then(data => {
                    user = data.user;
                    if (callbacks['update']) {
                        callbacks['update'].forEach(function(callback) {
                            if (callback) {
                                callback(user);
                            }
                        });
                    }
                    return user;
                });
        }

        function on(event, callback) {
            if (!callbacks[event]) {
                callbacks[event] = [callback];
            } else {
                callbacks[event].push(callback);
            }
        }

        function saveUser(newUser) {
            user = newUser;
        }
    }
})();