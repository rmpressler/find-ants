(function() {
    angular.module('find-ants')
        .service('server', Server);

    Server.$inject = ['$http', '$q'];
    function Server($http, $q) {
        return {
          request: request
        };

        function request(type, url, data) {
          return $http[type](url, data)
            .then(response => {
              if (response.data.error) {
                return $q.reject(response.data.error);
              }
              return response.data;
            });
        }
    }
})();