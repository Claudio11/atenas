'use strict';

angular.module('atenasApp')
    .controller('MainCtrl', function ($scope, $location) {

        $scope.$on('$routeChangeSuccess', function(next, current) {
            $scope.isSearchable = $location.url() === '/list';
        });
    });
