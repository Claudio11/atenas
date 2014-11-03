'use strict';

angular.module('atenasApp')
  .filter('booleanLabel', function () {
    return function (bool) {
      return (bool) ? 'Si' : 'No' ;
    };
  });
