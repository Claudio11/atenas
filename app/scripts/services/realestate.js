'use strict';

angular.module('atenasApp')
  .factory('RealEstate', function RealEstate($http, $filter, $q, Util) {
  	
    function RealEstate(data){
        // TODO is it ok to set attributes to be private?. 
        this.id = data.id;
        this.type = data.type; // See if its worthy to create subclasses (house, apartment, etc).
        this.sale = data.sale === '1'; // boolean (it can be both sale and rent)
        this.rent = data.rent === '1'; // boolean
        this.salePrice = data.salePrice;
        this.rentPrice = data.rentPrice;
        this.title = data.title;
        this.description = data.description;
        this.imageList = [];

        var actualCurrency = (Util.isEmpty(data.currency)) ? 'us' : data.currency;
        this.currency = Util.getCurrency(actualCurrency); // currency for sale, object, with the format: {label: "u$", usRatio: 1} usRatio = current currency by dollar, i.e.: $ => {label: "$", usRatio: 23.05}.
        var actualCurrencyRent = (Util.isEmpty(data.currencyRent)) ? 'us' : data.currencyRent;
        this.currencyRent = Util.getCurrency(actualCurrencyRent); // currency for rent
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
     *  Sets the current currency.
     *
     *  @param type Type of currency (u$, $, etc).
     *  @param transactionType Type of transaction (sale or rent).
     */
    RealEstate.prototype.setCurrency = function (type, transactionType) {
        if (transactionType === 'sale') {
            this.currency = Util.getCurrency(type);
        }
        else {
            this.currencyRent = Util.getCurrency(type);
        }
    };

    /**
     *  Get property pictures list.
     *
     *  @return List of images of the property.
     */
    RealEstate.prototype.getImageList = function (picture) {
        return this.imageList;
    };

    /**
     *  Adds the uploaded image to {this}.
     *
     *  @param Image to add.
     */
    RealEstate.prototype.addImage = function (picture) {
        this.imageList.push(picture);
    };

    /**
     *  Deletes the picture given by parameter.
     *
     *  @param Id of the Picture to delete.
     */
    RealEstate.prototype.deleteImage = function (pictureId) {
        var index;
        angular.forEach(this.imageList, function(picture, picIndex) {
            if (pictureId === picture.id) {
                index = picIndex;
            }
        });
        this.imageList.splice(index, 1);
    };   

    /**
     *  Save {this}.
     */
    RealEstate.prototype.save = function(){
        var deferred = $q.defer();
        var collectedData = {'data': this};
        console.info('collectedData', collectedData);
        var self = this;
        $http({
            data: collectedData,
            method: 'POST',
            url: 'api/properties/new'
        })
        .then(function(response) {
            if (response.data.status) {
                // Sets id of self, and id for image list.
                self.id = response.data.id;
                angular.forEach(self.imageList, function(picture, key) {
                    picture.setRelatedProperty(self.id);
                });
                alert("Se insertó la propiedad correctamente");
            }
            else {
                alert("La propiedad no ha podido ser insertada");
            }
        });
    }

    RealEstate.getList = function(lastId) {
        var deferred = $q.defer();
        var realEstatesList = [];

        var url = (Util.isEmpty(lastId)) ? 'api/properties' : 'api/propertiesAfterId/' + lastId;

        // TODO add web security checks.
        $http({
            method: 'GET',
            url: url
        })
        .then(function(response) {
            angular.forEach(response.data, function(value, key) {
                realEstatesList.push( new RealEstate(value) );
            });
            deferred.resolve(realEstatesList);
        },
        function() {
            deferred.reject();
        });

        return deferred.promise;
    };

    return RealEstate;
  });
