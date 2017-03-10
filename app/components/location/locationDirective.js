Components.directive('location', function () {
    return {
        restrict: 'E', //E = element, A = attribute, C = class, M = comment         
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
        link: function ($scope, element, attrs) { } //DOM manipulation
    }
});