(function() {
    angular.module('find-ants')
        .service('userService', UserService);

    UserService.$inject = ['dataService', '$q', 'server'];
    function UserService(dataService, $q, server) {
        let service = this;

        let callbacks = {};
        let user;

        service.create = create;
        service.on = on;

        // New API
        service.saveUser = saveUser;
        service.getUser = getUser;
        service.update = update;

        function getUser() {
            if (user) {
                return $q.resolve(user);
            }

            return server.request('get', '/current-user')
                .then(data => {
                    if (data.error) {
                        return $q.reject(data);
                    }

                    user = data.user;
                    return data.user;
                });
        }

        function create(user) {
            return dataService.create('users', user)
        }

        function update(updateObj) {
            return server.request('put', '/api/users', updateObj)
                .then(updatedUser => {
                    user = updatedUser;
                    if (callbacks['update']) {
                        callbacks['update'].forEach(function(callback) {
                            if (callback) {
                                callback(updatedUser);
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