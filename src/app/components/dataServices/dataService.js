'use strict';

angular.module('dataModule', [])
    .factory('dataService', function($http, $q, $log) {

        // Would normally use Angular's $resource, but this was pretty simple

        return {
            // User Data
            getUsers: function() {
                var deferred = $q.defer();
                var promise = deferred.promise;
                $http.get('app/components/dataServices/rawData/users.json')
                    .then(function(data) {
                        deferred.resolve(data);
                    }).catch(function(error) {
                        $log.error(error);
                        deferred.resolve(null);
                    });
                return promise;
            },
            // Log Data
            getLogs: function() {
                var deferred = $q.defer();
                var promise = deferred.promise;
                $http.get('app/components/dataServices/rawData/logs.json')
                    .then(function(data) {
                        deferred.resolve(data);
                    }).catch(function(error) {
                        $log.error(error);
                        deferred.resolve(null);
                    });
                return promise;
            }
        };
    });