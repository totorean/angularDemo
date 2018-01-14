/**
 * @ngdoc directive
 * @name skycon
 * @restrict 'E'
 *
 * @description
 * A directive for rendering an icon from skycons
 */
components.directive('skycon', function () {
    return {
        restrict: 'E', //E = element, A = attribute, C = class, M = comment
        replace: true,
        scope: {
            //@ reads the attribute value, = provides two-way binding, & works with functions
            icon: '@',
            size: '@',
            color: '@'
        },
        templateUrl: 'app/components/skycon/skyconView.html',
        link: function ($scope, element, attrs) {
            element[0].height = $scope.size || 64;
            element[0].width = $scope.size || 64;

            var config = {
                color: $scope.color || "black"
            };

            var skycons = new Skycons(config);
            skycons.add(element[0], $scope.icon);
            // start animation!
            skycons.play();
        }
    }
});