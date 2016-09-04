(function() {
    angular.module('find-ants')
        .factory('userService', UserService);

    UserService.$inject = ['dataService'];
    function UserService(dataService) {
        return {
            create: create,
            getBy: getBy,
            update: update
        };

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
                    return user;
                });
        }
    }
})();