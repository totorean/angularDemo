'use strict';

angular.module('darkskyForecast.forecast', ['ngRoute'])

.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/forecast/:location', {
        templateUrl: 'app/forecast/forecast.html',
        controller: 'ForecastCtrl'
    });
}])

.controller('ForecastCtrl', ['$scope', '$routeParams',
    function ($scope, $routeParams) {
        $scope.location = JSON.parse(localStorage.getItem($routeParams.location));
}]);