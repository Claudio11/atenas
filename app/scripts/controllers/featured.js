'use strict';

angular.module('atenasApp')
    .controller('FeaturedCtrl', ['$scope', 'realEstatesList',
        function ($scope, realEstatesList) {
            $scope.currentDetail; // Current real estate in the detail popup.
            $scope.featuredEstates = realEstatesList.splice(0, 3);

            // Sets the current detail real estate.
            $scope.setCurrentDetail = function (currentDetail) {
                $scope.currentDetail = currentDetail;
            }
            // Initialize camera gallery...
            jQuery(function(){
              jQuery('#camera_wrap_1').camera({
                height: '500px',
                pagination: false,
              });
            });
        }]);
