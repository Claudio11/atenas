'use strict';

/**
 * @ngdoc directive
 * @name atenasApp.directive:clickOutside
 * @description
 * # clickOutside
 */
angular.module('atenasApp')
  .directive('clickOutside', function ($document) {
    return {
        link: function postLink(scope, element, attrs) {
            var allowClickOutside = !attrs.isActive; // Allows to be triggered from the outside.
            var onClick = function (event) {
                if  (!allowClickOutside) {
                    var isChild = element.has(event.target).length > 0;
                    var isSelf = element[0] == event.target;
                    var isInside = isChild || isSelf;
                    if (!isInside) {
                        scope.$apply(attrs.clickOutside)
                    }
                }
                allowClickOutside = false
            }
            scope.$watch(attrs.isActive, function(newValue, oldValue) {
                if (newValue !== oldValue) {
                    allowClickOutside = newValue;
                    if (newValue) {
                        $document.bind('click', onClick);
                    }
                    else {
                        $document.unbind('click', onClick);
                    }
                }
            });
        }
    };
  });
