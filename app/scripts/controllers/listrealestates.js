'use strict';

angular.module('atenasApp')
  	.controller('ListRealEstatesCtrl', ['$scope', 'RealEstate', 'realEstatesList',
  		function ($scope, RealEstate, realEstatesList) {

        $scope.realEstates = realEstatesList;
  	}]
);
