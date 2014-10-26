'use strict';

angular.module('atenasApp')
  .directive('filterSection', function () {
    return {
      restrict: 'AE',
      templateUrl: 'views/filtersection-template.html',
      scope: {
      	filterData: "="
      },
      link: function (scope, element, attrs) {
        scope.selection;

        /**
         *	Sets the selected option
         */
        scope.setSelection = function (currentAttr, val) {
        	scope.filterData.data[currentAttr].value = true;
        	scope.selection = {attr: currentAttr, value: val};
        }

        /**
         *	Unsets the selected option
         */
        scope.unsetSelection = function () {
        	scope.filterData.data[scope.selection.attr].value = false;
        	scope.selection = undefined;
        }
      }
    };
  });
