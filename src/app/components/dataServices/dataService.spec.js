'use strict';

describe('Service: DataService', function () {

    // load the service"s module
    beforeEach(function () {
        module('dataModule');
    });

    it('should hit backend and get user data', inject(function (dataService, $httpBackend) {
        $httpBackend.expectGET(
            /app\/components\/dataServices\/rawData\/users.json$/, undefined
        ).respond({ people: 22 });
        dataService.getUsers().then(function (response) {
            expect(response.data.people).toEqual(22);
        });
        $httpBackend.flush();
    }));

    it('should hit backend and get user logs', inject(function (dataService, $httpBackend) {
        $httpBackend.expectGET(
            /app\/components\/dataServices\/rawData\/logs.json$/, undefined
        ).respond({ logs: 22 });
        dataService.getLogs().then(function (response) {
            expect(response.data.logs).toEqual(22);
        });
        $httpBackend.flush();
    }));


});
