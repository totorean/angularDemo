'use strict';

angular.module('darkskyForecast.main', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/main', {
    templateUrl: 'app/main/main.html',
    controller: 'MainCtrl'
  });
}])

.controller('MainCtrl', ['$scope', 'coordProvider', 'forecastProvider',
    function Main($scope, coordProvider, forecastProvider) {
        $scope.icon = "rain";
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
        
        $scope.displayWeather = function(index){
            var locationDetails = $scope.locations[index];
            var location = locationDetails.id;
            var savedLoc = localStorage.getItem(location);
            if(!savedLoc){ //non existent location in storage
                coordProvider.getCoords( location )                                          
                .then(function(coords)
                {   
                    localStorage.setItem(location, JSON.stringify({
                        label: locationDetails.label,
                        coords: coords
                    }));
                    return forecastProvider.getWeather( coords );       
                })
                .then(function(weather)
                {
                    var loc = JSON.parse(localStorage.getItem(location));
                    localStorage.setItem(location, JSON.stringify({
                        label: locationDetails.label,
                        coords: loc.coords,
                        timestamp: Date.now(),
                        temperature: weather.temperature,
                        icon: weather.icon
                    }));                                  
                });
            } else {
                var loc = JSON.parse(savedLoc);
                if(loc.timestamp && Math.abs(Date.now() - loc.timestamp) / 60000 < 60) {
                    //do nothing just send current saved data
                } else {
                    forecastProvider.getWeather( loc.coords )      
                    .then(function(weather){
                        localStorage.setItem(location, JSON.stringify({
                            label: locationDetails.label,
                            coords: loc.coords,
                            timestamp: Date.now(),
                            temperature: weather.temperature,
                            icon: weather.icon
                        }));                                  
                    });
                }
            }
            
            
        }

}]);