'use strict';

angular.module('atenasApp')
  .directive('infiniteScroll', ['$document', 'Util', 'RealEstate',
    function ($document, Util, RealEstate) {
        return {
            restrict: 'E',
            scope: {
                list: "=",         // List unfiltered.
                filteredList: "="
                // If needed create here the condition to search on the DB (most common last date).
            },
            link: function(scope, element, attrs) {
                // Check when the element scroll is near bottom, then we retrieve the elements after the id (sorted by date) and append it to the existing list.
                var isAbleToRequest = true; // Boolean that indicates if is ok to send a request (while is retrieving we should not allow to request even if the scroll is at the bottom). 
                
                // Added grid element (TODO: see if we have time to remove this gallery).
                //new grid3D( document.getElementById( 'grid3d' ) );

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

                var doc = angular.element($document);
                doc.on('scroll', function() {
                    if (isAbleToRequest) {
                        var offsetHeight = $document[0].body.offsetHeight;
                        var scrollPosition = doc.scrollTop();

                        if (offsetHeight - scrollPosition < 900) {
                            // Near the bottom of the list so we retrieve the new data...
                            isAbleToRequest = false;
                            RealEstate.getList(scope.lastId).then(function(realEstateList){
                                if (realEstateList.length > 0) {
                                    scope.list = scope.list.concat(realEstateList);
                                    scope.lastId = getLastId();
                                    isAbleToRequest = true;
                                }
                                else {
                                    // End of the list, no more elements to display...
                                    isAbleToRequest = false;
                                }
                            });
                        }
                    }
                });

                // When filtered list length is lesser than 5, call for more properties TODO: (maybe keep asking until filtered list is bigger than 5(?)). 
                scope.$watch('filteredList', function (newV, oldV) {
                    if (isAbleToRequest && newV.length < 5) {
                        RealEstate.getList(scope.lastId).then(function(realEstateList){
                            if (realEstateList.length > 0) {
                                scope.list = scope.list.concat(realEstateList);
                                scope.lastId = getLastId();
                            }
                        });
                    }
                });
            }
        };
    }]);
