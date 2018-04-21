angular.module('find-ants')
    .component('loadingDimmerComponent', {
        templateUrl: '/components/loading-dimmer/loading-dimmer.component.html',
        controller: function (loadingDimmer) {
            const $ctrl = this;

            $ctrl.$onInit = function $onInit() {
                $ctrl.isDimmerOn = false;
                loadingDimmer.registerDimmer(turnOn, turnOff);
            };

            function turnOn() {
                $ctrl.isDimmerOn = true;
            }

            function turnOff() {
                $ctrl.isDimmerOn = false;
            }
        }
    });
