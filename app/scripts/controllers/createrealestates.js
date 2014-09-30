'use strict';

angular.module('atenasApp')
  	.controller('CreateRealEstatesCtrl', function ($scope, RealEstate) {
		$scope.realEstate = new RealEstate({});

		$scope.save = function () {
			$scope.realEstate.save();
		}

		$scope.update = function () {
			console.info('update', $scope.realEstate);
		}

		$scope.setRealEstateCurrency = function (type, transactionType) {
			$scope.realEstate.setCurrency(type, transactionType);
		}

  	});
