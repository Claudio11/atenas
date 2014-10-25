'use strict';

angular.module('atenasApp')
  .filter('transactionImage', function () {
    return function (input) {
      return input ? 'images/icon1.png' : 'images/icon11.png';
    };
  });
