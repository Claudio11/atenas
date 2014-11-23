'use strict';

angular.module('atenasApp')
    .controller('MainCtrl', ['$scope', '$location',
        function ($scope, $location) {

            $scope.currentDetail; // Current real estate in the detail popup.

            $scope.$on('$routeChangeSuccess', function(next, current) {
                $scope.isList = $location.url() === '/list';
                $scope.isFeatured = $location.url() === '/';
                $scope.isContact = $location.url() === '/contact';
            });

            $scope.$watch('currentDetail', function() {
                console.info('estate', $scope.currentDetail);
            });

            // Sets the current detail real estate.
            $scope.setCurrentDetail = function (currentDetail) {
                $scope.currentDetail = currentDetail;
            }
        }]);
