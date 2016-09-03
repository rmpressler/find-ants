(function() {
    angular.module('find-ants')
        .filter('asAllocated', AsAllocated);

    function AsAllocated() {
        return function(booleanValue) {
            return booleanValue ? 'Allocated' : 'Not Allocated';
        }
    }
})();