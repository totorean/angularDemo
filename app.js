'use strict';

// Declare app level module which depends on views, and components
var darkskyForecast = angular.module('darkskyForecast', [
  'ngRoute',
  'Components',
  'service.forecastProvider',
  'service.coordProvider',
  'darkskyForecast.main',
  'darkskyForecast.forecast',
])
    .config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
        $locationProvider.hashPrefix('!');
        $routeProvider.otherwise({
            redirectTo: '/main'
        });
}])
    .constant("GOOGLE_API", {
        URL: "https://maps.googleapis.com/maps/api/geocode/json",
        KEY: "AIzaSyCbvUaQU0NUgFosiwPubwE_w-P2SDyoi00"
    })
    .constant("DARKSKY_API", {
        URL: "https://api.darksky.net/forecast/",
        KEY: "f703ce2aafdeab5479f4543700089236"
    });