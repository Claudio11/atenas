'use strict';

angular.module('atenasApp')
  .directive('infiniteScroll', function ($document, Util, RealEstate) {
    return {
        restrict: 'E',
        transclude: true,
        replace: true,
        scope: {
            list: "="         // List unfiltered.
            // If needed create here the condition to search on the DB (most common last date).
        },
        templateUrl: 'views/realEstates/list-template.html',
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

                    if (offsetHeight - scrollPosition < 700) {
                        // Near the bottom of the list so we retrieve the new data...
                        var currentScroll = doc.scrollTop;
                        isAbleToRequest = false;
                        var promise = RealEstate.getList(scope.lastId);
                        // TODO add element (preloading) while retrieves elements, then delete it (directive(?)).
                        promise.then(function(realEstateList){
                            if (realEstateList.length > 0) {
                                scope.list = scope.list.concat(realEstateList);
                                scope.lastId = getLastId();
                                doc.scrollTop = currentScroll;
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
        }
    };
  });
