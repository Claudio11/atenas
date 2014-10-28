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
                          },
                          {label: 'Inmueble', 
                            data: {
                              apartment: {
                                value: false, 
                                label: 'Apartamento'
                              }, 
                              house: {
                                value: false, 
                                label: 'Casa'
                              }
                            }
                          }
                        ];

    // Fields that can be filtered.
    // TODO!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! Iterate over filter data and create filterable fields programatically (except for generalSearch)
    var filterableFields = ['filterData.generalSearch', 'filterData[0].data.sale.value', 'filterData[0].data.rent.value',
                            'filterData[1].data.apartment.value', 'filterData[1].data.house.value'];
    // Call getFilterableFields (from filterData).

    // TODO put filter logic in a filter service
    var getSelectedItem = function (itemsData) {
      var selectedAttr;
      angular.forEach(itemsData, function(data, attr) {
        if (data.value) {
          selectedAttr = attr;
        }
      });
      return selectedAttr;
    }

    /**
     *  Returns the filtered list (it also sets the filters to find from filterData variable).
     */
    var getFilteredList = function () {
      // TODO!!!!!!: Iterate over filterData and set filter data programatically (except for generalSearch).
      return $filter('mainRealEstateFilter')($scope.realEstates, 
                                               {generalSearch: $scope.filterData.generalSearch,
                                                sale: $scope.filterData[0].data.sale.value,
                                                rent: $scope.filterData[0].data.rent.value,
                                                type: getSelectedItem($scope.filterData[1].data)});
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
