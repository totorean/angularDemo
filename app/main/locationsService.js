'use strict';

angular.module('darkskyForecast.main')
    .service('locationsService', function ($q, $http) {
        this.getLocations = function () {
            var deferred = $q.defer();

            $http.get('app/main/locations.json')
                .then(function (data) {
                    deferred.resolve(data.data.locations);
                })
                .catch(function (data) {
                    deferred.reject(data);
                });

            return deferred.promise;
        }
    });