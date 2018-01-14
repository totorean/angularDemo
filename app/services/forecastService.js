/**
 * @ngdoc service
 * @name forecastService
 *
 * @description
 * A service used for fetching the current weather data via http.
 */
'use strict';

services.service('forecastService', ['$q', '$http', '$sce', 'DARKSKY_API', function ($q, $http, $sce, DARKSKY_API) {

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

        var url = [DARKSKY_API.URL, DARKSKY_API.KEY, '/', coords.lat, ',', coords.lng].join('');
        $http({
                method: 'GET',
                timeout: 300000,
                url: url
            })
            .then(function (data) {
                // check response code
                if (parseInt(data.status) === 200) {
                    deferred.resolve(data.data);
                } else {
                    deferred.reject(data.status);
                }
            })
            .catch(function (data) {
                deferred.reject(data.message);
            });

        //return a promise that needs to be resolved before data can be used
        return deferred.promise;
    }
    }]);