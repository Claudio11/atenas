'use strict';

angular.module('atenasApp')
  .filter('ellipsis', ['$filter', '$window', 
    function ($filter, $window) {
    return function (input, limit) {
        var resultInput = '';
        if (typeof input !== 'undefined') {
            var currentWidth = $window.innerWidth;
            if (currentWidth < 1000) {
                limit = Math.floor(limit * (3/4));  // In smaller devices text has more height (because of small width and fluid layout).
            }
            resultInput = (input.length < limit) ? input : $filter('limitTo')(input, limit - 2) +  '...';
        }
        return resultInput;
    };
  }]);
