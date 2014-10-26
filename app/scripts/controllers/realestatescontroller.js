'use strict';

angular.module('atenasApp')
  .controller('RealEstatesCtrl', function ($scope, $filter, realEstatesList) {

    $scope.filteredList = $scope.realEstates = realEstatesList; // Set real estates
    $scope.currentDetail; // Current real estate in the detail popup.
    $scope.filterViewMore = false;
    $scope.filterData = [
                          {label: 'Operacion', 
                            data: {
                              sale: {
                                value: false, 
                                label: 'Venta'
                              }, 
                              rent: {
                                value: false, 
                                label: 'Alquiler'
                              }
                            }
                          }
                        ];

    // Fields that can be filtered.
    // TODO!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! Iterate over filter data and create filterable fields programatically (except for generalSearch)
    var filterableFields = ['filterData.generalSearch', 'filterData[0].data.sale.value', 'filterData[0].data.rent.value'];
    // Call getFilterableFields (from filterData).

    /**
     *  Returns the filtered list (it also sets the filters to find from filterData variable).
     */
    var getFilteredList = function () {
      // TODO!!!!!!: Iterate over filterData and set filter data programatically (except for generalSearch).
      return $filter('mainRealEstateFilter')($scope.realEstates, 
                                               {generalSearch: $scope.filterData.generalSearch,
                                                sale: $scope.filterData[0].data.sale.value,
                                                rent: $scope.filterData[0].data.rent.value});
    }

    angular.forEach(filterableFields, function(field) {
      // Watch every change of a filterable field and filter the list.
      $scope.$watch(field, function(newValue, oldValue) {
          if (newValue !== oldValue){
              $scope.filteredList = getFilteredList();
          }
      });
    });

    $scope.$watchCollection('realEstates', function(newValue, oldValue) {
        // Also watch when the list of real estates changes...
        if (newValue !== oldValue){
            $scope.filteredList = getFilteredList();
        }
    });

    // Sets the current detail real estate.
    $scope.setCurrentDetail = function (currentDetail) {
      $scope.currentDetail = currentDetail;
      console.info($scope.currentDetail);
    }

    // Toggles if the filter is short or long.
    $scope.toggleViewMore = function () {
      $scope.filterViewMore = !$scope.filterViewMore;
    }

  });
