'use strict';

angular.module('atenasApp')
  .factory('RealEstate', function RealEstate($http, $filter, $q, Util) {
  	
    function RealEstate(data){
        this.type = data.type; // See if its worthy to create subclasses (house, apartment, etc).
        this.sale = data.sale; // boolean (it can be both sale and rent)
        this.rent = data.rent; // boolean
        this.salePrice = data.salePrice;
        this.rentPrice = data.rentPrice;
        this.description = data.description;
        this.currency = Util.getCurrency(data.currency); // object with the format: {label: "u$", usRatio: 1} usRatio = current currency by dollar, i.e.: $ => {label: "$", usRatio: 23.05}.
    };

    /**
     *  Returns true if it matches the current filters.
     *
     *  @param Filter param with the following format: (TODO).
     */
    RealEstate.prototype.passesFilter = function(filterParams) {
        var matches = true;
        var lowercaseGeneralSearch = angular.lowercase(filterParams.generalSearch);
        if (filterParams.sale && !this.sale) {
            matches = false;
        }
        if (!Util.isEmpty(filterParams.generalSearch) // If it is empty we do not test it.
                && (angular.lowercase(this.description).indexOf(lowercaseGeneralSearch) === -1)) {
            // TODO: improve search so it matches every word instead of checking for all the string (indexof).
            matches = false;
        }
        return matches;
    };

    RealEstate.getList = function() {
        var deferred = $q.defer();
        var realEstatesList = [];

        // TODO add web security checks.
        $http({
            method: 'GET',
            url: 'api/properties'
        })
        .then(function(response) {
            angular.forEach(response.data, function(value, key) {
                realEstatesList.push( new RealEstate(value) );
            });
            deferred.resolve(realEstatesList);
        });

        return deferred.promise;
    };

    return RealEstate;
  });
