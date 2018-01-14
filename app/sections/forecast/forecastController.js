/**
 * @ngdoc controller
 * @name ForecastCtrl
 *
 * @description
 * A controller that loads the data for a location making it available for the view
 */
'use strict';

darkskyForecast.controller('forecastController', ['$scope', '$routeParams',
        function ($scope, $routeParams) {
        $scope.location = JSON.parse(localStorage.getItem($routeParams.location));
        }]);