'use strict';

angular.module('atenasApp')
  .controller('RealEstatesCtrl', function ($scope, $filter, realEstatesList) {

    $scope.filterData = {};
    $scope.filteredList = $scope.realEstates = realEstatesList;

    // Fields that can be filtered.
    var filterableFields = ['filterData.generalSearch', 'filterData.sale'];

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
        console.info('List changed: ', newValue);
        if (newValue !== oldValue){
            $scope.filteredList = $filter('mainRealEstateFilter')($scope.realEstates, 
                                                             {generalSearch: $scope.filterData.generalSearch,
                                                              sale: $scope.filterData.sale});
        }
    });    
  });
