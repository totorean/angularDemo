'use strict';
angular.module('service.forecastProvider', [])
    .factory('forecastProvider', function ($q, $http, $sce, DARKSKY_API) {
        return {
            getWeather: function (coords) {
                var deferred = $q.defer();

                /*var url = [DARKSKY_API.URL, DARKSKY_API.KEY, '/', coords.lat, ',', coords.lng, '?exclude=hourly,daily,flags'].join('');
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
                 .catch(function (data, status, headers, config) {
                     deferred.reject(data.message);
                 });*/

                setTimeout(function () {
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
                }, 700);

                //return a promise that needs to be resolved before data can be used
                return deferred.promise;
            }
        }
    });