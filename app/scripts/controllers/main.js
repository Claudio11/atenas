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

  });
