(function() {
    angular.module('find-ants')
        .directive('faHeader', Header);

    function Header() {
        return {
            restrict: 'E',
            templateUrl: 'components/header/header.html'
        };
    }
})();
