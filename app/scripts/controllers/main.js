'use strict';

/**
 * @ngdoc function
 * @name atenasApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the atenasApp
 */
angular.module('atenasApp')
  .controller('MainCtrl', function ($scope, $http) {

    function createUnknownError(status) {
      return {
        status: status,
        statusText: 'Internal Server Error',
        description: 'No details available'
      };
    }

    $http({
        method: 'GET',
        url: 'api/properties',
        data: { 'message' : 'message' }
    })
        .then(function(response) {
            // success
            console.info('succ', response);
        }, 
        function(response) { // optional
            // failed
            console.info('failed');
        }
    );

    // $scope.awesomeThings = [];
    // $scope.loading = true;

    // // Get awesome things list
    // $http({method: 'GET', url: '/api/features'}).

    //   success(function (data) {
    //     console.info(data);
    //     $scope.loading = false;
    //     $scope.awesomeThings = data;

    //     // Get description of each thing
    //     $scope.awesomeThings.forEach(function (thing) {
    //       thing.loading = true;

    //       $http({method: 'GET', url: thing.href}).
    //         success(function (data) {
    //           thing.loading = false;
    //           thing.description = data.description;
    //         }).
    //         error(function (data, status) {
    //           thing.loading = false;
    //           thing.error = data && data.description ? data : createUnknownError(status);
    //         });
    //     });
    //   }).

    //   error(function (data, status) {
    //     $scope.loading = false;
    //     $scope.error = data && data.description ? data : createUnknownError(status);
    //   });
  });
