(function() {
    angular.module('find-ants')
        .filter('asAllocated', AsAllocated)
        .filter('capitalize', Capitalize);

    function AsAllocated() {
        return function(booleanValue) {
            return booleanValue ? 'Allocated' : 'Not Allocated';
        }
    }

    function Capitalize() {
        return function (rawValue) {
            return rawValue.slice(0, 1).toUpperCase() + rawValue.slice(1);
        }
    }
})();
