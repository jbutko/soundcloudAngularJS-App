'use strict';

var soundcloudAppCtrl = angular.module('soundcloudApp.controller', []);

soundcloudAppCtrl
	.controller('MainCtrl', ['$scope', 'SoundcloudService', 'localStorageService', '$q', 'Restangular',
	function($scope, SoundcloudService, localStorageService, $q, Restangular) {

		// restangular parameters
		var params = {
		  client_id: '0f8f602ff7b13a1110193701aa99aa73',
		  oauth_token: SoundcloudService.getToken()
		};

		// send oauth_token with every request
		Restangular.setDefaultRequestParams({ oauth_token: params.oauth_token });

		// authentication START
		$scope.auth = {
			authenticated: true
		};

		if (SoundcloudService.getToken() === null) {
			$scope.auth.authenticated = false;
		} else {
			$scope.auth.authenticated = true;
		}
		$scope.connect = function() {
			SoundcloudService.connect().then(function() {

				// $scope.setToken = SoundcloudService.setToken();
				// user is authorized
				$scope.auth.authenticated = true;
				// Call to '/me' is an asynchronous call with promise so we need to wait to get back {me} object and then asign it to $scope.me
				SoundcloudService.me().then(function(data) {
					$scope.me = data;
				}, function(data) {
					console.log("Error: No data returned");
				});
				// get data right after login
				SoundcloudService.getData().then(function(data) {
					$scope.data = data;
				});
			});
		}
		// authentication END

		// logout function
		$scope.logout = function() {
			SoundcloudService.logout();
			// delete data about user so scope can change after change
			$scope.me = null;
			// delete latests tracks data so scope can change after change
			$scope.data = null;
			// we are not authenticated after logout
			$scope.auth.authenticated = false;
		}

		SoundcloudService.me().then(function(data) {
			$scope.me = data;
		}, function(data) {
			console.log("Error: No data returned");
		});


		SoundcloudService.getData().then(function(data) {
			// assign data we get (latest tracks) to $scope.data
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



