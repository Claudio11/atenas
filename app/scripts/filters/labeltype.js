'use strict';

angular.module('atenasApp')
  .filter('labelType', function () {
    return function (type) {
    	var typeLabel;
      	switch (type) {
          case "house":
            typeLabel = 'Casa';
            break;
          case "apartment":
            typeLabel = 'Apartamento';
            break;
          case "terrain":
            typeLabel = 'Terreno';
            break;
          case "local":
            typeLabel = 'Local';
            break;
          default:
            typeLabel = '';
        }
        return typeLabel;
    };
  });
