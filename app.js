'use strict';

// Declare app level module which depends on views, and components
angular.module('darkskyForecast', [
  'ngRoute',
  'darkskyForecast.view1',
  'darkskyForecast.view2',
  'Components'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/view1'});
}]);
