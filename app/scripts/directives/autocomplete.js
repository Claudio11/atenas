'use strict';

angular.module('atenasApp')
  .directive('autoComplete', function ($timeout) {
    return {
        restrict: 'EA',
        templateUrl: 'views/autocomplete.html',
        scope:{
            items: '=',
            mySearch: '@'
        },
        controller: function($scope, $element, $attrs) {
            $scope.items = angular.fromJson($scope.items);
            $scope.listVisible = false;

            $scope.$watch('mySearch', function(){
                $scope.listVisible = true;   // When the user is writing we should display the list...
            });
            
            $scope.setItem = function(itemName){
                $scope.mySearch = itemName;
                $timeout( function() {
                    // Timeout created to allow digest cycle to finish (so when I set mySearch attr, the full cycle
                    // is run and AFTER that, the listVisible is set to false).
                    $scope.listVisible = false; 
                }, 0);
            };
        }
    }
  });
