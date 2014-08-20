'use strict';

// var app = angular.module('soundcloudApp', [
//     'ngCookies',
//     'ngResource',
//     'ngSanitize',
//     'ngRoute',
//     'LocalStorageModule',
//     'soundcloudApp.services',
//     'soundcloudApp.controller',
//     'restangular'
//   ]);

angular
  .module('soundcloudApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    'LocalStorageModule',
    'soundcloudApp.services',
    'soundcloudApp.controller',
    'soundcloudApp.directives',
    'restangular'
  ])
  .config(['$routeProvider', '$locationProvider', 'localStorageServiceProvider', '$httpProvider', 'RestangularProvider',
    function($routeProvider, $locationProvider, localStorageServiceProvider, $httpProvider, RestangularProvider) {

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

       // You should set a prefix to avoid overwriting any local storage variables from the rest of your app
       // e.g. localStorageServiceProvider.setPrefix('youAppName');
       // With provider you can use config as this:
      localStorageServiceProvider.prefix = 'soundcloudApp';

      // Restangular config
      RestangularProvider.setBaseUrl('https://api.soundcloud.com');
    }
  ])
  // Lodash global implementation
  .constant('_', window._)
   // use in views, ng-repeat="x in _.range(3)"
  .run(function($rootScope) {
    $rootScope._ = window._;
  });

