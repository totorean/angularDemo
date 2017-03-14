/**
 * @ngdoc directive
 * @name location
 *
 * @description
 * A directive for rendering an icon with label underneath and a tooltip
 *
 */
Components.directive('location', function () {
    return {
        restrict: 'E', //E = element, A = attribute, C = class, M = comment   
        replace: true,
        scope: {
            //@ reads the attribute value, = provides two-way binding, & works with functions
            tooltip: '@',
            label: '@',
            icon: '@'
        },
        template: '<div class="location" title={{tooltip}}>' +
            '<img class="location-icon" ng-src="./assets/icons/{{icon}}.png"/>' +
            '<div class="location-label">{{label}}</div>' +
            '</div>',
        link: function ($scope, element, attrs) {} //DOM manipulation
    }
});