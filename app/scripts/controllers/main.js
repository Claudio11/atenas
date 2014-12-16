'use strict';

angular.module('atenasApp')
    .controller('MainCtrl', ['$scope', '$location',
        function ($scope, $location) {

            $scope.currentDetail; // Current real estate in the detail popup.
            $scope.menuOpen = false; // Menu list for small devices (TODO: also close it on resize).

            $scope.$on('$routeChangeSuccess', function(next, current) {
                $scope.isList = $location.url() === '/list';
                $scope.isFeatured = $location.url() === '/';
                $scope.isContact = $location.url() === '/contact';

                if ($scope.menuOpen) {
                    $scope.toggleMenu();
                }
            });

            // When the currentDetail changes, we send it to the server so it is set as viewed by the user (if last view is more than one day (TODO)). 
            $scope.$watch('currentDetail', function() {
                if ($scope.currentDetail) {
                    $scope.currentDetail.setAsViewed();
                }
            });

            // Sets the current detail real estate.
            $scope.setCurrentDetail = function (currentDetail) {
                $scope.currentDetail = currentDetail;
            }

            // Toggles menu on small devices.
            $scope.toggleMenu = function () {
                $scope.menuOpen = !$scope.menuOpen;
            }
        }]);
