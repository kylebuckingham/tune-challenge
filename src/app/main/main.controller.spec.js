'use strict';

describe('MainCtrl', function() {
    var $q,
        $rootScope,
        $scope,
        mockUserService,
        dataDeferred,
        mockData = {
            1: 'data',
            2: 'data',
            3: 'data',
            4: 'data',
            5: 'data'
        };


    beforeEach(module('tuneApp'));

    beforeEach(inject(function(_$q_, _$rootScope_) {
        $q = _$q_;
        $rootScope = _$rootScope_;
    }));

    beforeEach(inject(function($controller) {
        $scope = $rootScope.$new();

        mockUserService = {
            getUsers: function() {
                dataDeferred = $q.defer();
                return dataDeferred.promise;
            }
        };

        /* jshint ignore:start */
        spyOn(mockUserService, 'getUsers').and.callThrough();
        /* jshint ignore:end */

        $controller('MainCtrl', {
            '$scope': $scope,
            'userService': mockUserService,
        });
    }));

    describe('Data functions', function() {

        beforeEach(function() {
            dataDeferred.resolve(mockData);
            $rootScope.$apply();
        });
        it('should retrieve data', function() {
            expect(mockUserService.getUsers).toHaveBeenCalled();
        });
    });
    describe('scrolling function', function() {

        beforeEach(function() {
            dataDeferred.resolve(mockData);
            $rootScope.$apply();
        });
        it('should load more options to the UI', function() {
            expect($scope.people).toEqual(['data', 'data', 'data', 'data']);
        });
    });
});