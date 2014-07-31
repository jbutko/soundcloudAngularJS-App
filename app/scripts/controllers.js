'use strict';

var soundcloudAppCtrl = angular.module('soundcloudApp.controller', []);

soundcloudAppCtrl
	.controller('MainCtrl', ['$scope', 'SoundcloudService', 'localStorageService', '$q', 'Restangular',
	function($scope, SoundcloudService, localStorageService, $q, Restangular) {

		// restangular parameters
		var params = {
		  client_id: '0f8f602ff7b13a1110193701aa99aa73',
		  oauth_token: localStorageService.get('token')
		};

		// send oauth_token with every request
		Restangular.setDefaultRequestParams({ oauth_token: params.oauth_token });

		// get user info
		Restangular.one('me').get().then(function(me) {
		//Restangular.customGET("me", {oauth_token: params.access_token}).then(function(me) {
			$scope.me = me;
			console.log($scope.me);
		});

		// authentication START
		$scope.auth = {
			authenticated: true
		};

		if (SoundcloudService.getToken() === null) {
			$scope.auth.authenticated = false;
			//console.log('logged out');
			//console.log(SoundcloudService.getToken());
		} else {
			$scope.auth.authenticated = true;
			//console.log('logged innn');
			//console.log(SoundcloudService.getToken());
		}

		$scope.connect = function() {
			SoundcloudService.connect().then(function() {
					//console.log('guest spotted !');
					$scope.setToken = SoundcloudService.setToken();
					$scope.auth.authenticated = true;
			});
		}
		// authentication END

		// logout function
		$scope.logout = function() {
			SoundcloudService.logout();
			$scope.auth.authenticated = false;
		}


		SoundcloudService.getData().then(function(data) {
			if (window.console && console.log) {
				console.log("objects returned: " + data.length);
			}
			$scope.data = data;
		});


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



