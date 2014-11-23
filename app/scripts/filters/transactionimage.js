'use strict';

angular.module('atenasApp')
  .filter('transactionImage', function () {
    return function (property) {
    	var transactionImage;
    	if (property.sale && property.rent) {
    		transactionImage = 'images/icon111.png'
    	}
    	else {
    		transactionImage = property.sale ? 'images/icon1.png' : 'images/icon11.png';
    	}
        return transactionImage;
    };
  });
