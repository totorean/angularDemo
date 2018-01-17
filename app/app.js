'use strict';

// Declare app level module which depends on views, and components
var darkskyForecast = angular.module( 'darkskyForecast', [
    'ngRoute',
    'components'
] )
    .config( [ '$routeProvider', '$locationProvider', function( $routeProvider, $locationProvider ) {
        $routeProvider
            .when( '/', {
                templateUrl: 'app/sections/main/mainView.html',
                controller: 'mainController'
            } )
            .when( '/forecast/:location', {
                templateUrl: 'app/sections/forecast/forecastView.html',
                controller: 'forecastController'
            } );
        //no more hash bang
        //$locationProvider.html5Mode( true );
    } ] )
    .constant( "GOOGLE_API", {
        URL: "https://maps.googleapis.com/maps/api/geocode/json",
        KEY: "AIzaSyCbvUaQU0NUgFosiwPubwE_w-P2SDyoi00"
    } )
    .constant( "DARKSKY_API", {
        URL: "https://api.darksky.net/forecast/",
        KEY: "f703ce2aafdeab5479f4543700089236"
    } );