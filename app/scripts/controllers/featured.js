'use strict';

angular.module('atenasApp')
    .controller('FeaturedCtrl', ['$scope', 'realEstatesList',
        function ($scope, realEstatesList) {
            $scope.featuredEstates = realEstatesList.splice(0, 3);

            // Initialize camera gallery...
            jQuery(function(){
              jQuery('#camera_wrap_1').camera({
                height: '500px',
                pagination: false,
              });
            });
        }]);
