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
    'angularFileUpload',
    'angular-carousel',
    'LocalStorageModule'
  ])
  .config(['$routeProvider', '$httpProvider', 'localStorageServiceProvider', function ($routeProvider, $httpProvider, localStorageServiceProvider) {

    // Add needed interceptor/s.
    $httpProvider.interceptors.push('httpInterceptor');

    // Set prefix for local storage. 
    localStorageServiceProvider.setPrefix('atenas');

    $routeProvider
      .when('/', {
        templateUrl: 'views/realEstates/featured.html',
        controller: 'FeaturedCtrl',
        resolve: {
          realEstatesList: function (RealEstate) {
            return RealEstate.getList();
          }
        }
      })
      .when('/list', {
        
        templateUrl: 'views/realEstates/list.html',
        controller: 'RealEstatesCtrl',
        resolve: {
          realEstatesList: function (RealEstate) {
            return RealEstate.getList();
          }
        }
      })
      .when('/contact', {
        templateUrl: 'views/contact.html',
        controller: 'ContactCtrl'
      })
      .when('/realEstates/upsert/:id?', {
        templateUrl: 'views/realEstates/new.html',
        controller: 'CreateRealEstatesCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);
