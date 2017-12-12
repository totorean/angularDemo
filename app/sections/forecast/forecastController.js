/**
 * @ngdoc controller
 * @name ForecastCtrl
 *
 * @description
 * A controller that loads the data for a location making it available for the view
 */
'use strict';

angular.module( 'darkskyForecast.forecast', [ 'ngRoute' ] )

    .config( [ '$routeProvider', function( $routeProvider ) {
        $routeProvider.when( '/forecast/:location', {
            templateUrl: 'app/sections/forecast/forecastView.html',
            controller: 'ForecastCtrl'
        } );
    } ] )

    .controller( 'ForecastCtrl', [ '$scope', '$routeParams',
        function( $scope, $routeParams ) {
            $scope.location = JSON.parse( localStorage.getItem( $routeParams.location ) );
        } ] );