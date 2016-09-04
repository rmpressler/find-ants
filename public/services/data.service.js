(function() {
    angular.module('find-ants')
        .factory('dataService', DataService);

    DataService.$inject = ['$http'];
    function DataService($http) {
        return {
            create: create,
            read: read,
            update: update
        };

        function create(table, object) {
            return $http.post('/api/' + table, object)
                .then(extractData);
        }

        function read(table, query) {
            var path = table + '?query=' + JSON.stringify(query);

            return $http.get('/api/' + path)
                .then(extractData);
        }

        function update(table, updateObj) {
            return $http.put('/api/' + table, updateObj)
                .then(extractData);
        }

        function extractData(result) {
            return result.data;
        }
    }
})();