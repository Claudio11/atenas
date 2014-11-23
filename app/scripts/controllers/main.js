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

            // When the currentDetail changes, we send it to the server so it is set as viewed by the user (if last view is more than one day (TODO)). 
            $scope.$watch('currentDetail', function() {
                console.info('estate', $scope.currentDetail);
                if ($scope.currentDetail) {
                    $scope.currentDetail.setAsViewed();
                }
            });

            // Sets the current detail real estate.
            $scope.setCurrentDetail = function (currentDetail) {
                $scope.currentDetail = currentDetail;
            }
        }]);
