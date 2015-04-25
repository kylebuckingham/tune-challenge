'use strict';

angular.module('tuneApp', ['ngTouch', 'ngSanitize', 'ngResource', 'ngRoute', 'ui.bootstrap', 'processingModule', 'chart.js', 'customDirectives'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
;
