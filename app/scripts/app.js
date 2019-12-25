'use strict';

/**
 * @ngdoc overview
 * @name speedDialApp
 * @description
 * # speedDialApp
 *
 * Main module of the application.
 */
var speedDial = angular
  .module('speedDialApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'pascalprecht.translate'
  ])
  .config(["$routeProvider", "$translateProvider", function ($routeProvider, $translateProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/speed_dial.html',
        controller: 'SpeedDialCtrl',
        controllerAs: 'speed'
      })
      .otherwise({
        redirectTo: '/'
      });

      $translateProvider
        .useStaticFilesLoader({
            prefix: '/translations/',
            suffix: '.json'
        })
        .preferredLanguage('en_US')
        .useSanitizeValueStrategy('escape');

  }]);
  
speedDial.constant("CONSTANT", {
    "MES_HOST": "http://localhost:8080/mes",
    "SPEED_DIAL_HOST": "http://localhost:7073/speeddial",
    "DEPARTMENT" : "/departments",
    "LOCATION_TYPE" : "/locations/types",
    "LOCALES" : "/locales",
    "SPEEDDIAL" : "/phone/speeddial"
});
