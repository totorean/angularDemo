'use strict';

darkskyForecast.factory('coordProvider', function ($q, $http, GOOGLE_API) {
        return {
            getCoords : function (location) {
                var deferred = $q.defer();

                $http({
                    method: 'GET',
                    timeout: 300000,
                    url: GOOGLE_API.URL,
                    params: {
                        'address': location,
                        'key': GOOGLE_API.KEY
                    }
                }).then(function successCallback(data) {
                    if (parseInt(data.status) === 200) {
                        deferred.resolve(data.data.results[0].geometry.location);
                    } else {
                        deferred.reject(data.status);
                    }
                    
                  }, function errorCallback(data) {
                    deferred.reject(data.error_message);
                  });
                
                //return a promise that needs to be resolved before data can be used
                return deferred.promise;
            }
        }    
    });
