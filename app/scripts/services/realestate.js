'use strict';

angular.module('atenasApp')
  .factory('RealEstate', function RealEstate($http, $filter, $q, Util) {
  	
    function RealEstate(data){
        this.id = data.id;
        this.type = data.type; // See if its worthy to create subclasses (house, apartment, etc).
        this.sale = data.sale === '1'; // boolean (it can be both sale and rent)
        this.rent = data.rent === '1'; // boolean
        this.salePrice = data.salePrice;
        this.rentPrice = data.rentPrice;
        this.title = data.title;
        this.description = data.description;

        var actualCurrency = (Util.isEmpty(data.currency)) ? 'us' : data.currency;
        this.currency = Util.getCurrency(actualCurrency); // currency for sale, object, with the format: {label: "u$", usRatio: 1} usRatio = current currency by dollar, i.e.: $ => {label: "$", usRatio: 23.05}.
        var actualCurrencyRent = (Util.isEmpty(data.currencyRent)) ? 'us' : data.currencyRent;
        this.currencyRent = Util.getCurrency(actualCurrencyRent); // currency for rent
        console.info(this);
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

    /**
     *  Save {this}.
     */
    RealEstate.prototype.save = function(){
        var deferred = $q.defer();
        var collectedData = {'data': this};
        var self = this;
        $http({
            data: collectedData,
            method: 'POST',
            url: 'api/properties/new'
        })
        .then(function(response) {
            if (response.data.status) {
                self.id = response.data.id;
                alert("Se insertó la propiedad correctamente");
            }
            else {
                alert("La propiedad no ha podido ser insertada");
            }
        });
    }

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

    RealEstate.getListAfterId = function(realEstateId) {
        var deferred = $q.defer();
        var realEstatesList = [];

        // TODO add web security checks.
        $http({
            method: 'GET',
            url: 'api/propertiesAfterId'
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
