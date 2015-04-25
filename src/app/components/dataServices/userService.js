'use strict';

angular.module('processingModule', ['dataModule'])
    .factory('userService', function($q, $filter, dataService) {


        var usersHash = {},
            deferred = $q.defer(),
            promise = deferred.promise,
            users,
            logs;

        // Get Data
        function processData() {

            var logsPromise = dataService.getLogs(),
                usersPromise = dataService.getUsers();

            // make sure we have all data before continuing
            $q.all([
                    logsPromise,
                    usersPromise
                ])
                .then(function(values) {
                    users = values[1].data;
                    logs = values[0].data;
                    createUserSummary();
                });
        }

        // Process users data
        function createUserSummary() {
            var userId,
                i;

            for (i = users.length - 1; i >= 0; i--) {
                userId = users[i].id;
                usersHash[userId] = users[i];

                // create count variables for later (could certaintly be cleaner)
                usersHash[userId].summary = {
                    impressions: 0,
                    conversions: 0,
                    revenue: 0,
                    chartData: {
                        start: null,
                        end: null,
                        labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
                        data: [
                            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                        ]
                    }
                };
            }
            addLogsToUsers();
        }


        // Process logs data
        function addLogsToUsers() {
            var thisId,
                summary,
                i;

            for (i = logs.length - 1; i >= 0; i--) {
                /* jshint ignore:start */
                thisId = logs[i].user_id;
                /* jshint ignore:end */
                summary = usersHash[thisId].summary;

                if (logs[i].revenue > 0) {
                    summary.revenue += logs[i].revenue;
                    summary.conversions++;

                    // oh why, was this date formatted so poorly?
                    var d = logs[i].time.replace(/\s/g, 'T');
                    d = new Date(d);
                    var thisDay = d.getDate();

                    // add daily conversion count
                    summary.chartData.data[0][Number(thisDay)]++;

                    // Parse date range
                    var millis = d.getTime();
                    if (!summary.start || summary.start > millis) {
                        summary.start = millis;
                        summary.end = millis + 2592000000;
                    }

                } else {
                    summary.impressions++;
                }
            }

            // when done, release the promise
            deferred.resolve(usersHash);
        }

        processData();

        return {
            // User Data
            getUsers: function() {
                return promise;
            }
        };
    });