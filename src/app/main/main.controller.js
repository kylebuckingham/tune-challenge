'use strict';

angular.module('tuneApp')
  .controller('MainCtrl', function ($scope, userService) {

  	// Get processed data from service
    userService.getUsers().then(function(response){
      $scope.allPeople = response;

	    // Kick off loading
	    $scope.people = [];
	    $scope.loadMore();
    });

    // Enabling infinite scroll (had a faster initial load time)
    var count = 1;
    $scope.loadMore = function() {
        for (var i = 1; i < 20; i++) {
        	if (count < Object.keys($scope.allPeople).length){
	            $scope.people.push($scope.allPeople[count]);
	            count++;
	        }
        }
    };

    // Chart settings
    $scope.colours = ['#000'];
    $scope.options = {
      animation          : false,
      bezierCurve        : false,
      pointDot           : false,
      scaleGridLineColor : 'rgba(0,0,0,0)',
      strokeColor        : 'rgba(0,0,0,0)',
      scaleShowGridLines : false,
      scaleShowLabels    : false,
      showScale          : false,
      showTooltips       : false,
      datasetFill        : false,
      datasetStrokeWidth : 1.5
    };

  });
