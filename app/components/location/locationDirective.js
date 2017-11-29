/**
 * @ngdoc directive
 * @name location
 *
 * @description
 * A directive for rendering an icon with label underneath and a tooltip
 *
 */
Shared.directive( 'location', function() {
    return {
        restrict: 'E', //E = element, A = attribute, C = class, M = comment   
        replace: true,
        scope: {
            //@ reads the attribute value, = provides two-way binding, & works with functions
            tooltip: '@',
            label: '@',
            icon: '@'
        },
        templateUrl: 'locationView.html',
        link: function( $scope, element, attrs ) {
        } //DOM manipulation
    }
} );