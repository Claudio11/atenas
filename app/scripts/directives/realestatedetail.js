'use strict';

angular.module('atenasApp')
  .directive('realEstateDetail', function () {
    return {
        templateUrl: 'views/realEstates/detail-template.html',
        restrict: 'E',
        transclude: true,
        scope: {
            estate: "="
        }
    };
  });
