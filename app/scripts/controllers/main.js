'use strict';

angular.module('atenasApp')
    .controller('MainCtrl', ['$scope', '$location',
    	function ($scope, $location) {

	        $scope.$on('$routeChangeSuccess', function(next, current) {
	            $scope.isList = $location.url() === '/list';
	            $scope.isFeatured = $location.url() === '/';
	            $scope.isContact = $location.url() === '/contact';
	        });
	    }]);
