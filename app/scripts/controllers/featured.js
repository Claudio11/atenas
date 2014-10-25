'use strict';

angular.module('atenasApp')
  	.controller('FeaturedCtrl', function ($scope, realEstatesList) {
  		$scope.realEstates = realEstatesList.splice(0, 3);
      	console.info('FeaturedCtrl', $scope.realEstates);

      	jQuery(function(){
	        jQuery('#camera_wrap_1').camera({
	          height: '500px',
	          pagination: false,
	        });
	      });
  	});
