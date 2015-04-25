'use strict';

describe('Service: UserService', function() {

    // load the service"s module
    beforeEach(function() {
        module('processingModule');
    });

    it('should hit backend and get user data', inject(function(userService) {
        // essentially just make sure this endpoint exists. Should be much more detailed
        var data = userService.getUsers();
        expect(data).toBeDefined();
    }));
});