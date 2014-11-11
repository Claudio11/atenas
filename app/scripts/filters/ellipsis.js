'use strict';

angular.module('atenasApp')
  .filter('ellipsis', ['$filter', 
  	function ($filter) {
    return function (input, limit) {
      return (input.length < limit) ? input : $filter('limitTo')(input, limit - 2) +  '...';
    };
  }]);
