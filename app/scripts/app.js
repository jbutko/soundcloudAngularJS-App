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
      // RestangularProvider.setBaseUrl('https://api.mongolab.com/api/1/databases/angularjs/collections');
      // RestangularProvider.setDefaultRequestParams({ oauth_token: '1-89994-86755-98234564099ee36580' });
      // RestangularProvider.setDefaultHeaders({Authorization:'Bearer ' + localStorageServiceProvider.setPrefix('theNameOfMyApp')});
      RestangularProvider.setBaseUrl('https://api.soundcloud.com');
      console.log(RestangularProvider.defaultHeaders);
    }
  ]);
