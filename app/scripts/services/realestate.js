'use strict';

angular.module('atenasApp')
  .factory('RealEstate', ['$http', '$filter', '$q', 'localStorageService', 'Util', 'Picture',
    function ($http, $filter, $q, localStorageService, Util, Picture) {
  	
        function RealEstate(data){
            this.id = data.id;
            this.type = data.type; // See if its worthy to create subclasses (house, apartment, etc).
            this.sale = data.sale === '1'; // boolean (it can be both sale and rent)
            this.rent = data.rent === '1'; // boolean
            this.salePrice = data.salePrice;
            this.rentPrice = data.rentPrice;
            this.title = data.title;
            this.description = data.description;
            this.imageList = (data.children) ? this.setPictureList(data.children) : [];
            this.bedroomLength = data.bedroomLength || 0;
            this.bathLength = data.bathLength || 0;
            this.garage = data.garage === '1';
            this.yardage = data.yardage || 0;
            this.furnished = data.furnished === '1';
            this.orientation = data.orientation || 'front';
            this.terrace = data.terrace === '1';
            this.commonExpenses = data.commonExpenses;
            this.vigilance = data.vigilance === '1';
            this.whiteLine = data.whiteLine === '1';
            this.featured = data.featured === '1';
            this.views = data.views;

            var actualCurrency = (Util.isEmpty(data.currency)) ? 'us' : data.currency;
            this.currency = Util.getCurrency(actualCurrency); // currency for sale, object, with the format: {label: "u$", usRatio: 1} usRatio = current currency by dollar, i.e.: $ => {label: "$", usRatio: 23.05}.
            var actualCurrencyRent = (Util.isEmpty(data.currencyRent)) ? 'us' : data.currencyRent;
            this.currencyRent = Util.getCurrency(actualCurrencyRent); // currency for rent
        };

        /**
         *  Returns true if {{this}} matches the current filters.
         *
         *  @param Filter param with the following format: (TODO).
         */
        RealEstate.prototype.passesFilter = function(filterParams) {
            var matches = true;
            var lowercaseGeneralSearch = angular.lowercase(filterParams.generalSearch);
            if (filterParams.sale && !this.sale) {
                matches = false;
            }
            if (filterParams.rent && !this.rent) {
                matches = false;
            }
            if (filterParams.type && filterParams.type !== this.type) {
                matches = false;
            }
            if (filterParams.bedroomLength && filterParams.bedroomLength !== this.bedroomLength.toString()) {
                if (this.bedroomLength <= 3 || filterParams.bedroomLength !== '4') {
                    // It can have more than 3 bedrooms (4 means "more than 3 bedrooms").  
                    matches = false;
                }
            }
            if (!Util.isEmpty(filterParams.generalSearch) // If it is empty we do not test it.
                    && (angular.lowercase(this.description).indexOf(lowercaseGeneralSearch) === -1)
                    && (angular.lowercase(this.title).indexOf(lowercaseGeneralSearch) === -1)
                ) {
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
         *  Set the picture list from the data json.
         *
         *  @param List of assets.
         */
        RealEstate.prototype.setPictureList = function (assetList) {
            var imageList = [];
            angular.forEach(assetList, function(picture) {
                var fileSpec = {name: picture.name, type: picture.type, size: picture.size};
                imageList.push(new Picture(fileSpec, picture.asset_id, picture.path));
            });
            return imageList;
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
            var self = this;
            $http({
                data: {'data': this},
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

        /**
         *  Save {this}.
         */
        RealEstate.prototype.update = function(){
            var deferred = $q.defer();
            $http({
                data: {'data': this},
                method: 'POST',
                url: 'api/properties/update'
            })
            .then(function(response) {
                if (response.status) {
                    alert("Se actualizó la propiedad correctamente");
                }
                else {
                    alert("La propiedad no ha podido ser actualizada");
                }
            });
        }

        /**
         *  Set {this} as viewed (in order to send the data to the database we check if {this} has 
         *  not been seen in the last day (TODO)).
         */
        RealEstate.prototype.setAsViewed = function () {

            var shouldUpdateViewCount = true;   // If it is not visited or was visited more than 3 hours ago
            var currentTimestamp = new Date().getTime();
            var lastMarkedVisitTimestamp = localStorageService.get('visited_' + this.id);

            if (lastMarkedVisitTimestamp) {
                var diffHours = (currentTimestamp - lastMarkedVisitTimestamp) / (1000 * 3600); 
                if (diffHours < 3) {
                    shouldUpdateViewCount = false;
                }
            }

            if (shouldUpdateViewCount) {
                var deferred = $q.defer();
                var self = this;
                $http({
                    data: {'data': this},
                    method: 'POST',
                    url: 'api/properties/viewed'
                })
                .then(function(response) {
                    if (response.data.status) {
                        self.views++;
                        localStorageService.set('visited_' + self.id, currentTimestamp);
                    }
                    else {
                        console.log('Error al actualizar contador de visitas.');
                    }
                });
            }
        } 


        // Static methods.

        /**
         *  Obtain the proper list
         *
         *  @param Id of the last real estate in the list (optional).
         */
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

        RealEstate.get = function(realEstateId) {
            var deferred = $q.defer();

            // TODO add web security checks.
            $http({
                method: 'GET',
                url: 'api/properties/' + realEstateId
            })
            .then(function(response) {
                var realEstateToUpdate;
                if (response.data[0]) {
                  realEstateToUpdate = new RealEstate(response.data[0]);
                }
                deferred.resolve(realEstateToUpdate);
            },
            function() {
                deferred.reject();
            });

            return deferred.promise;
        };

        return RealEstate;
    }]);
