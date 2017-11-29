/**
 * @ngdoc controller
 * @name MainCtrl
 *
 * @description
 * A controller for fetching the coordinates and the current
 * weather for a selected location and storing them in the local storage
 */
'use strict';

angular.module('darkskyForecast.main', ['ngRoute'])

.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/main', {
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
    });
}])

.controller('MainCtrl', ['$scope', '$location', 'coordService', 'forecastService', 'locationsService',
    function Main($scope, $location, coordProvider, forecastProvider, locationsProvider) {
        $scope.locations = [];
        locationsProvider.getLocations()
            .then(function (locations) {
                $scope.locations = locations;
            });

        /**
         * @ngdoc method
         * @methodOf MainCtrl
         * @name displayWeather
         * @description A function that fetches the coordinates and the current weather for a 
         * selected location and stores them in the local storage
         *
         * @param {Number} index the clicked location index
         *
         */
        $scope.displayWeather = function (index) {
            var locationDetails = $scope.locations[index];
            var location = locationDetails.id;
            var savedLoc = localStorage.getItem(location);

            if (!savedLoc) { //non existent location in storage
                coordProvider.getCoords(location)
                    .then(function (coords) {
                        localStorage.setItem(location, JSON.stringify({
                            coords: coords
                        }));
                        return forecastProvider.getWeather(coords);
                    })
                    .then(function (weather) {
                        var loc = JSON.parse(localStorage.getItem(location));
                        localStorage.setItem(location, JSON.stringify({
                            label: locationDetails.label,
                            coords: loc.coords,
                            timestamp: Date.now(),
                            temperature: weather.temperature,
                            icon: weather.icon
                        }));
                        $location.path('/forecast/' + location);
                    });
            } else {
                var loc = JSON.parse(savedLoc);
                if (loc.timestamp && Math.abs(Date.now() - loc.timestamp) / 60000 < 60) { //all data available
                    $location.path('/forecast/' + location);
                } else { //refresh only weather data
                    forecastProvider.getWeather(loc.coords)
                        .then(function (weather) {
                            localStorage.setItem(location, JSON.stringify({
                                label: locationDetails.label,
                                coords: loc.coords,
                                timestamp: Date.now(),
                                temperature: weather.temperature,
                                icon: weather.icon
                            }));
                            $location.path('/forecast/' + location);
                        });
                }
            }


        }

}]);