'use strict';

angular.module('atenasApp')
  .filter('ellipsis', ['$filter', '$window', 
  	function ($filter, $window) {
    return function (input, limit) {
    	var currentWidth = $window.innerWidth;
		if (currentWidth < 1000) {
    		limit = Math.floor(limit * (3/4));  // In smaller devices text has more height (because of small width and fluid layout).
    	}
      	return (input.length < limit) ? input : $filter('limitTo')(input, limit - 2) +  '...';
    };
  }]);
