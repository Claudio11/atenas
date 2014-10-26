'use strict';

angular.module('atenasApp')
  .controller('RealEstatesCtrl', function ($scope, $filter, realEstatesList) {

    $scope.filterViewMore = false;
    $scope.filterData = {};
    $scope.filteredList = $scope.realEstates = realEstatesList; // Set real estates
    $scope.currentDetail; // Current real estate in the detail popup.

    // Fields that can be filtered.
    var filterableFields = ['filterData.generalSearch', 'filterData.sale'];

    // Sets the current detail real estate.
    $scope.setCurrentDetail = function (currentDetail) {
      $scope.currentDetail = currentDetail;
      console.info($scope.currentDetail);
    }

    // Toggles if the filter is short or long.
    $scope.toggleViewMore = function () {
      $scope.filterViewMore = !$scope.filterViewMore;
    }

    angular.forEach(filterableFields, function(field) {
      // Watch every change of a filterable field and filter the list.
      $scope.$watch(field, function(newValue, oldValue) {
          if (newValue !== oldValue){
              $scope.filteredList = $filter('mainRealEstateFilter')($scope.realEstates, 
                                                               {generalSearch: $scope.filterData.generalSearch,
                                                                sale: $scope.filterData.sale});
          }
      });
    });

    $scope.$watchCollection('realEstates', function(newValue, oldValue) {
        // Also watch when the list of real estates changes...
        if (newValue !== oldValue){
            $scope.filteredList = $filter('mainRealEstateFilter')($scope.realEstates, 
                                                             {generalSearch: $scope.filterData.generalSearch,
                                                              sale: $scope.filterData.sale});
        }
    });

  });
