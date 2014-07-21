'use strict';

angular.module('atenasApp')
  .factory('Util', function() {
    // AngularJS will instantiate a singleton by calling "new" on this function
    return {
      getCurrency: function(currencyType){
        var currencyObject = {};
        switch (currencyType) {
          case 'us':
            currencyObject = {label: 'u$', usRatio: 1};
            break;
          case 's':
            currencyObject = {label: '$', usRatio: 23.5};
            break;
          default:
            currencyObject = {label: 'u$', usRatio: 1};
            break;
        }
        return currencyObject;
      },
      isEmpty: function(val){
        return typeof val === 'undefined' || val === '' || val === null;
      }
    }
  });
