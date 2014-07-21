'use strict';

angular.module('atenasApp')
  .factory('RealEstate', function RealEstate($http, $filter, Util) {
  	
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
        // TODO: retrieve it from DB.
        var rs1 = new RealEstate({type: 'house', sale: true, rent: false, salePrice:50000, description: 'Linda casa con vista al mar', currency: 'us'});
        var rs2 = new RealEstate({type: 'apartment', sale: false, rent: true, rentPrice:9000, description: 'Apartamento en ciudad vieja', currency: 's'});
        var rs3 = new RealEstate({type: 'house', sale: false, rent: true, rentPrice:19000, description: 'Casa en venta en prado', currency: 's'});
        var rs4 = new RealEstate({type: 'apartment', sale: true, rent: false, salePrice:109000, description: 'Apartamento contra la rambla', currency: 'us'});
        return [rs1, rs2, rs3, rs4];
        // $http({
        //     method: 'GET',
        //     url: 'tempApi/properties.php',
        //     data: { 'message' : 'message' }
        // })
        //     .then(function(response) {
        //         // success
        //         console.info('succ', response);
        //     }, 
        //     function(response) { // optional
        //         // failed
        //         console.info('failed');
        //     }
        // );

    };

    return RealEstate;
  });
