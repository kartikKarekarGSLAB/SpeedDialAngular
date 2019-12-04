'use strict';

/**
 * @ngdoc overview
 * @name speedDialApp
 * @description
 * # speedDialApp
 *
 * Main module of the application.
 */
angular
  .module('speedDialApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/speed_dial.html',
        controller: 'SpeedDialCtrl',
        controllerAs: 'speed'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
