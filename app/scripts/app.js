'use strict';

/**
 * @ngdoc overview
 * @name atenasApp
 * @description
 * # atenasApp
 *
 * Main module of the application.
 */
angular
  .module('atenasApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'angularFileUpload'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/realEstates/list.html',
        controller: 'RealEstatesCtrl',
        resolve: {
          realEstatesList: function (RealEstate) {
            return RealEstate.getList();
          }
        }
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/realEstates/new', {
        templateUrl: 'views/realEstates/new.html',
        controller: 'CreateRealEstatesCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
