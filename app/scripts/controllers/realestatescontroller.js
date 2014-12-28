'use strict';

angular.module('atenasApp')
  .controller('RealEstatesCtrl',['$scope', '$filter', 'realEstatesList', 
    function ($scope, $filter, realEstatesList) {

      $scope.displayed = false;

      $scope.filteredList = $scope.realEstates = realEstatesList; // Set real estates
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
                                },
                                terrain: {
                                  value: false, 
                                  label: 'Terreno'
                                }, 
                                premise: {
                                  value: false, 
                                  label: 'Locales'
                                }
                              }
                            },
                            {label: 'Dormitorios', 
                              data: {
                                0: {
                                  value: false, 
                                  label: 'Sin dormitorio'
                                }, 
                                1: {
                                  value: false, 
                                  label: '1 dormitorio'
                                },
                                2: {
                                  value: false, 
                                  label: '2 dormitorios'
                                },
                                3: {
                                  value: false, 
                                  label: '3 dormitorios'
                                }, 
                                4: {
                                  value: false, 
                                  label: 'Mas de 3 dormitorios'
                                }
                              }
                            }
                          ];

      // Fields that can be filtered.
      // TODO!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! Iterate over filter data and create filterable fields programatically (except for generalSearch)
      var filterableFields = ['generalSearch', 'filterData[0].data.sale.value', 'filterData[0].data.rent.value',
                              'filterData[1].data.apartment.value', 'filterData[1].data.house.value', 'filterData[1].data.terrain.value', 'filterData[1].data.premise.value',
                              'filterData[2].data[0].value', 'filterData[2].data[1].value', 'filterData[2].data[2].value', 'filterData[2].data[3].value', 'filterData[2].data[4].value'];
      // Call getFilterableFields (from filterData).

      // TODO put filter logic in a filter service!!!!!!!!!!!!!!!!!!!!!!
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
                                                 {generalSearch: $scope.generalSearch,
                                                  sale: $scope.filterData[0].data.sale.value,
                                                  rent: $scope.filterData[0].data.rent.value,
                                                  type: getSelectedItem($scope.filterData[1].data),
                                                  bedroomLength: getSelectedItem($scope.filterData[2].data)});
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

      // Toggles if the filter is short or long.
      $scope.toggleViewMore = function () {
        $scope.filterViewMore = !$scope.filterViewMore;
      }

      // Toggles position of filters on small devices.
      $scope.toggleFilterPosition = function () {
        $scope.displayed = !$scope.displayed;
      }

    }]);
