(function() {
    angular.module('find-ants')
        .service('userService', UserService);

    UserService.$inject = ['dataService', '$q', 'server'];
    function UserService(dataService, $q, server) {
        let service = this;

        let callbacks = {};

        service.on = on;

        // New API
        service.saveUser = saveUser;
        service.getUser = getUser;
        service.update = update;
        service.register = register;
        service.addAccount = addAccount;

        // Exposed for testing
        service._noUsernamePasswordError = 'Username and password are required';
        service._cachedUser = null;

        function getUser() {
            if (service._cachedUser) {
                return $q.resolve(service._cachedUser);
            }

            return server.request('get', '/user')
                .then(data => service._cachedUser = data.user);
        }

        function register(username, password) {
            if (!username || !password) {
                return $q.reject(service._noUsernamePasswordError);
            }

            const newUser = {
                username,
                password,
                accounts: [],
                bills: []
            };

            return server.request('post', '/user', newUser)
                .then(data => {
                    service._cachedUser = data.user;
                    return service._cachedUser;
                });
        }

        function update(updateObj) {
            return server.request('put', '/user', updateObj)
                .then(data => {
                    service._cachedUser = data.user;
                    if (callbacks['update']) {
                        callbacks['update'].forEach(function(callback) {
                            if (callback) {
                                callback(service._cachedUser);
                            }
                        });
                    }
                    return service._cachedUser;
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
            service._cachedUser = newUser;
        }

        function addAccount(newAccount) {
            service._cachedUser.accounts.push(newAccount);
            return service.update({
                _id: service._cachedUser._id,
                accounts: service._cachedUser.accounts
            });
        }
    }
})();
