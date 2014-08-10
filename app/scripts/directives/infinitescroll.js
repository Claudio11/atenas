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
            console.info(scope.list);

            // Set last retrieved id.
            var lastId = scope.list[scope.list.length -1].id;
            if (!Util.isEmpty(lastId)) {
                scope.lastId = lastId;
            }

            var elem = element[0];
            element.on('scroll', function() {
                if (elem.scrollHeight - 10 <= elem.scrollTop + elem.offsetHeight) {
                    // Near the bottom of the list so we retrieve the new data...
                    elem.scrollTop = 0;
                    var promise = RealEstate.getListAfterId();
                    promise.then(function(realEstateList){
                        scope.list = scope.list.concat(realEstateList);
                    });
                }
            });
        }
    };
  });
