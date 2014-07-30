'use strict';

var app = angular.module('soundcloudApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    'LocalStorageModule',
    'soundcloudApp.services',
    'soundcloudApp.controller'
  ]);

app.
  config(['$routeProvider', '$locationProvider', 'localStorageServiceProvider', '$httpProvider',
    function($routeProvider, $locationProvider, localStorageServiceProvider, $httpProvider) {
      //$httpProvider.responseInterceptors.push('httpInterceptor');
      //$httpProvider.interceptors.push('authInterceptor');

      $routeProvider
        .when('/', {
          templateUrl: 'views/main.html',
          controller: 'MainCtrl'
        })
        .otherwise({
          redirectTo: '/'
        });

      // use the HTML5 History API
      $locationProvider.html5Mode(true);

      //localStorageServiceProvider.setPrefix('demoPrefix');
      // localStorageServiceProvider.setStorageCookieDomain('example.com');
      // localStorageServiceProvider.setStorageType('sessionStorage');
    }
  ]);


// app
//   .run(function(api) {
//     api.init();
//   });
