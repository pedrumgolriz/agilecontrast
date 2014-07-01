'use strict';

/**
 * @ngdoc overview
 * @name contrastRatioApp
 * @description
 * # contrastRatioApp
 *
 * Main module of the application.
 */
angular
  .module('uiMixer', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'index.html',
        controller: 'MainCtrl'
      });
  });
