'use strict';

angular.module('atenasApp')
  .filter('mainRealEstateFilter', function () { 
    return function (realEstates, filterParams) {
        var matchedEstates = []; 
        angular.forEach(realEstates, function(realEstate) {
            if (realEstate.passesFilter(filterParams)){
                matchedEstates.push(realEstate);
            }
        });
        return matchedEstates;
    };
  });
