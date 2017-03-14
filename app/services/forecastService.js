/**
 * @ngdoc service
 * @name forecastService
 *
 * @description
 * A service used for fetching the current weather data via http.
 */
'use strict';

angular.module('service.forecastService', [])
    .service('forecastService', ['$q', '$http', '$sce', 'DARKSKY_API', function ($q, $http, $sce, DARKSKY_API) {

        /**
         * @ngdoc method
         * @methodOf forecastService
         * @name getWeather
         *
         * @param {Object} coords an object with lat (latitude) and lng (longitude) parameters
         * @returns {Object} object containing current weather data
         *
         */
        this.getWeather = function (coords) {
            var deferred = $q.defer();

            var url = [DARKSKY_API.URL, DARKSKY_API.KEY, '/', coords.lat, ',', coords.lng, '?exclude=hourly,daily,flags'].join('');
            //START - comment this block if you want to use the dummy
            $http({
                    method: 'GET',
                    timeout: 300000,
                    url: url
                })
                .then(function (data) {
                    // check response code
                    if (parseInt(data.status) === 200) {
                        deferred.resolve(data.data.currently);
                    } else {
                        deferred.reject(data.status);
                    }
                })
                .catch(function (data) {
                    deferred.reject(data.message);
                });
            //END - comment this block if you want to use the dummy

            //simulate the call
            /*setTimeout(function () {
                deferred.resolve({
                    apparentTemperature: 41.42,
                    cloudCover: 0.3,
                    dewPoint: 34.35,
                    humidity: 0.68,
                    icon: "partly-cloudy-night",
                    ozone: 390.56,
                    precipIntensity: 0,
                    precipProbability: 0,
                    pressure: 1016.39,
                    summary: "Partly Cloudy",
                    temperature: 44.18,
                    time: 1489252719,
                    visibility: 6.21,
                    windBearing: 325,
                    windSpeed: 4.95
                });
            }, 700);*/

            //return a promise that needs to be resolved before data can be used
            return deferred.promise;
        }
    }]);