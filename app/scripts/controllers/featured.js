'use strict';

angular.module('atenasApp')
  	.controller('FeaturedCtrl', function ($scope, realEstatesList) {
  		$scope.featuredEstates = realEstatesList.splice(0, 3);
      	console.info('FeaturedCtrl', $scope.featuredEstates);

      	// Initialize camera gallery...
      	jQuery(function(){
			jQuery('#camera_wrap_1').camera({
			  height: '500px',
			  pagination: false,
			});
		});
  	});
