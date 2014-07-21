'use strict';

angular.module('atenasApp')
  .controller('RealEstatesCtrl', function ($scope, $filter, RealEstate) {
    $scope.filterData = {};
    $scope.realEstates = RealEstate.getList();

    // this logic belongs to Filter controller TODO: change it.
    $scope.filteredList = $scope.realEstates;

    // Fields that can be filtered.
    var filterableFields = ['filterData.generalSearch', 'filterData.sale'];

    angular.forEach(filterableFields, function(field) {
        $scope.$watch(field, function(newValue, oldValue) {
            if (newValue !== oldValue){
                $scope.filteredList = $filter('mainRealEstateFilter')($scope.realEstates, 
                                                                 {generalSearch: $scope.filterData.generalSearch,
                                                                  sale: $scope.filterData.sale});
            }
        });
    });
  });
