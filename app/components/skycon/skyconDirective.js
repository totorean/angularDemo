Components.directive('skycon', function () {
    return {
        restrict: 'E', //E = element, A = attribute, C = class, M = comment   
        replace: true,
        scope: {
            //@ reads the attribute value, = provides two-way binding, & works with functions
            icon: '@',
            size: '@',
            color: '@'        
        },
        template: '<canvas class="skycon"></canvas>',
        link: function ($scope, element, attrs) { 
            element[0].height = $scope.size || 64;
            element[0].width = $scope.size || 64;
            
            var config = {
                color: $scope.color || "black"
            };

            var skycons = new Skycons( config );
            skycons.add(element[0], $scope.icon);
            // start animation!
            skycons.play();
        }
    }
});