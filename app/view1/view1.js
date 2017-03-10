'use strict';

angular.module('darkskyForecast.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'app/view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['$scope',
    function View1($scope) {
        $scope.locations = [
            {   tooltip: 'Timisoara',
                label: 'Timisoara',
                icon: 'timisoara',
                id: 'timisoara'
            },
            {   tooltip: 'Cluj-Napoca',
                label: 'Cluj-Napoca',
                icon: 'cluj-napoca',
                id: 'cluj'
            },
            {   tooltip: 'Iasi',
                label: 'Iasi',
                icon: 'iasi',
                id: 'iasi'
            },
            {   tooltip: 'Bucuresti',
                label: 'Bucuresti',
                icon: 'bucuresti',
                id: 'bucuresti'
            },
            {   tooltip: 'Constanta',
                label: 'Constanta',
                icon: 'constanta',
                id: 'constanta'
            }
            
        ];
        
        $scope.displayWeather = function(location){
            console.log(location);
        }

}]);