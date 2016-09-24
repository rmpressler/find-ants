(function() {
    angular.module('find-ants')
        .service('userService', UserService);

    UserService.$inject = ['dataService'];
    function UserService(dataService) {
        var service = this;

        var callbacks = {};

        service.create = create;
        service.getBy = getBy;
        service.update = update;
        service.on = on;

        function create(user) {
            return dataService.create('users', user)
        }

        function getBy(property, value) {
            var query = {};

            query[property] = value;

            return dataService.read('users', query)
                .then(function (users) {
                    return users[0];
                });
        }

        function update(updateObj) {
            return dataService.update('users', updateObj)
                .then(function(user) {
                    window.localStorage.setItem('user', JSON.stringify(user));
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
    }
})();