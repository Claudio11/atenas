'use strict';

angular.module('atenasApp')
  	.controller('ListRealEstatesCtrl', ['$scope', 'RealEstate', 'realEstatesList',
  		function ($scope, RealEstate, realEstatesList) {

        $scope.realEstates = realEstatesList;

        $scope.deleteRealEstate = function (re) {
          if (window.confirm("Realmente quiere borrar la propiedad?")) {
              re.delete().then(function (resp) {
                  RealEstate.getEntireList().then(function (realEstates) {
                      $scope.realEstates = realEstates;
                  }, function () {
                      alert('Hubo un problema al traer las propiedades');
                  });
                  alert('La propiedad fue correctamente borrada');
              }, function (err) {
                  alert('La propiedad no pudo ser borrada');
              });
          }
        }
  	}]
);
