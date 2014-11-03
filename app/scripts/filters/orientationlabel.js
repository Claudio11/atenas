'use strict';

angular.module('atenasApp')
  .filter('orientationLabel', function () {
    return function (orientation) {
      var orientationLabel;
      	switch (orientation) {
          case "front":
            orientationLabel = 'Frente';
            break;
          case "counterFront":
            orientationLabel = 'Contrafrente';
            break;
          case "inside":
            orientationLabel = 'Interno';
            break;
          case "lateral":
            orientationLabel = 'Lateral';
            break;
          default:
            orientationLabel = '';
        }
        return orientationLabel;
    };
  });
