'use strict';

angular.module('atenasApp')
  .directive('infiniteScroll', function (Util, RealEstate) {
    return {
        restrict: 'A',
        transclude: true,
        replace: true,
        scope: {
            list: "=", // List to append when reaching bottom.
            // If needed create here the condition to search on the DB (most common last date).
        },
        template:  // TODO: templateUrl
           '<div class="list-container">' +
              '<ul><!-- List of properties TODO use templateUrl-->' +
                '<li ng-repeat="estate in list">' +
                  '<ul>' +
                    '<li>' +
                    '  {{estate.description}}' +
                    '</li>' +
                    '<li ng-show="estate.salePrice">' +
                    '  {{estate.currency.label}} {{estate.salePrice}}' +
                    '</li>' +
                    '<li ng-show="estate.rentPrice">' +
                    '  {{estate.currency.label}} {{estate.rentPrice}}' +
                    '</li>' +
                  '</ul>' +
                '</li>' +
              '</ul>' +
            '</div>'
        ,
        link: function(scope, element, attrs) {
            // Check when the element scroll is near bottom, then we retrieve the elements after the id (sorted by date) and append it to the existing list.
            var isAbleToRequest = true; // Boolean that indicates if is ok to send a request (while is retrieving we should not allow to request even if the scroll is at the bottom). 
            
            /**
             *  Method in charge of get the last id of the list (so we know from what id to retrieve items).
             */
            var getLastId = function() {
                var lastId;
                if (scope.list.length > 0) {
                    lastId = scope.list[scope.list.length -1].id;
                }
                return lastId;
            }

            scope.lastId = getLastId();
            var elem = element[0];

            element.on('scroll', function() {
                console.info(isAbleToRequest);
                if (isAbleToRequest) {
                    if (elem.scrollHeight - 10 <= elem.scrollTop + elem.offsetHeight) {
                        // Near the bottom of the list so we retrieve the new data...
                        var currentScroll = elem.scrollTop;
                        isAbleToRequest = false;
                        var promise = RealEstate.getListAfterId();
                        // TODO add element (preloading) while retrieves elements, then delete it (directive(?)).
                        promise.then(function(realEstateList){
                            if (realEstateList.length > 0) {
                                scope.list = scope.list.concat(realEstateList);
                                scope.lastId = getLastId();
                                elem.scrollTop = currentScroll;
                            }
                            isAbleToRequest = true;
                        });
                    }
                }
            });
        }
    };
  });
