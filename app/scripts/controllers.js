'use strict';

var soundcloudAppCtrl = angular.module('soundcloudApp.controller', []);

soundcloudAppCtrl
	.controller('MainCtrl', ['$scope', 'SoundcloudService', 'localStorageService', function($scope, SoundcloudService, localStorageService) {

		//$scope.setToken = SoundcloudService.setToken();
		$scope.getToken = SoundcloudService.getToken();

		/* User object */
		$scope.user = SoundcloudService.me();

		$scope.connect = function() {
		  SoundcloudService.connect();
		};

		$scope.$watch('localStorageDemo', function(value){
		  localStorageService.set('localStorageDemo',value);
		  $scope.localStorageDemoValue = localStorageService.get('localStorageDemo');
		});

		$scope.token = SoundcloudService.setToken();
		$scope.logout = function() {
			SoundcloudService.logout();
		}

		$scope.loadTracks = function() {
			//$scope.$apply(function(){
			  SoundcloudService.loadTracks();
			  console.log(data);
			//});
		}

		$scope.data = function(limit) {
			dataService.getData(limit);
		}
		//$scope.clearLocalstorage = SoundcloudService.clearLocalstorage();

		// if (localStorageService.getStorageType().indexOf('session') >= 0) {
		//   $scope.storageType = 'Session storage';
		// }

		// if (!localStorageService.isSupported) {
		//   $scope.storageType = 'Cookie';
		// }

		//$scope.login = SoundcloudService.login();

		//$scope.logout = SoundcloudService.logout();


	}]);

soundcloudAppCtrl
	.controller('CallbackCtrl', ['$scope', '$location', function($scope, $location) {

			$location.path('/');

		}
	]);



// soundcloudAppCtrl
// 	.controller('PlayerController', ['$scope', '$http', 'SoundcloudService', 'dataService', function($scope, $http, SoundcloudService, dataService) {

// 		// var apiKey = SoundcloudService.getToken(),
// 		// 	url = 'https://api.soundcloud.com/me/activities?limit=20&duration[from]=1800000&oauth_token=' + apiKey;
// 		// console.log('apiKey: ' + apiKey);
// 		// // Hidden our previous section's content
// 		// // construct our http request
// 		// $http({
// 		// 	method: 'JSONP',
// 		// 	url: url
// 		// }).success(function(data, status) {
// 		// 	// Now we have a list of the stories (data.list.story)
// 		// 	console.log(data)
// 		// }).error(function(data, status) {
// 		// 	console.log('error');
// 		// });
// 		$scope.data = dataService.getData();

// 	}]);

// soundcloudAppCtrl.controller('AngularJSCtrl', function($scope, dataService1) {
//     $scope.data = dataService1.getUsers();
// });



