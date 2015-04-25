'use strict';

angular.module('customDirectives', [])

// Infa-scroll!
.directive('whenScrolled', function() {
    return function(scope, elm, attr) {
        var raw = elm[0];

        elm.bind('scroll', function() {
            if (raw.scrollTop + raw.offsetHeight >= raw.scrollHeight) {
                scope.$apply(attr.whenScrolled);
            }
        });
    };
})

// for some reason certain images were 404'ing
.directive('onErrorSrc', function() {
    return {
        link: function(scope, element) {
          element.bind('error', function() {
          	scope.person.avatar = null;
          	scope.$apply();
          });
        }
    };
});
