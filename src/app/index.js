'use strict';

angular.module('tuneApp', ['ngTouch', 'ngRoute', 'ui.bootstrap', 'chart.js', 'processingModule',  'customDirectives'])
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
