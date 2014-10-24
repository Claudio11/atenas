'use strict';

angular.module('atenasApp')
  	.controller('FeaturedCtrl', function ($scope, realEstatesList) {
  		$scope.realEstates = realEstatesList.splice(0, 3);
      	console.info('FeaturedCtrl', $scope.realEstates);
  	});
