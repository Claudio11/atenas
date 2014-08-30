'use strict';

angular.module('atenasApp')
  	.controller('CreateRealEstatesCtrl', function ($scope, RealEstate) {
		$scope.realEstate = new RealEstate({});

		$scope.save = function () {
			console.info('save', $scope.realEstate);
			$scope.realEstate.save();
		}

		$scope.update = function () {
			console.info('update', $scope.realEstate);
		}

  	});
