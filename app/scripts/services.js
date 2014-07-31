'use strict';

var Token;

var soundcloudAppService = angular.module('soundcloudApp.services', []);

soundcloudAppService
	.service('SoundcloudService', ['$window', 'localStorageService', '$http', '$q', function($window, localStorageService, $http, $q) {

		var token;

		// initiate auth popup
		SC.initialize({
			client_id: clientID,
			redirect_uri: callbackUrl,
			response_type: "code_and_token",
			scope: 'non-expiring'
		});

		this.connect = function() {
			var deferred = $q.defer();
			SC.connect(function() {
				SC.get('/me', function(me) {
					token = SC.accessToken();
					console.log('token: ' + token);
					var tokenStorage = localStorageService.set('token', token);
				});
				deferred.resolve();
			});
			return deferred.promise;
		},

		this.me = function(callback) {
			SC.get('/me', {client_id: '0f8f602ff7b13a1110193701aa99aa73'}, callback);
		}

		this.clearLocalstorage = function() {
			localStorageService.clearAll();
		}

		this.setToken = function() {
			var tokenStorage = localStorageService.set('token', token);
			//console.log('tokenStorage: ' + localStorageService.get('token'));
		}

		this.getToken = function() {
			var returnedToken;
			return returnedToken = localStorageService.get('token');
		}

		this.login = function() {
			SC.connect(function() {
				SC.get('/me', function(me) {
					alert('Hello, ' + me.username);
				});
			});
		};

		this.logout = function() {
			localStorageService.clearAll();
		};

		// load last tracks from user's soundcloud feed
		var token = localStorageService.get('token');
		//console.log('tokeniiik: ' + token);
		delete $http.defaults.headers.common['X-Requested-With'];
		this.getData = function() {
			var deferred = $q.defer();
			//$http() returns a $promise that we can add handlers with .then()
			$http.get('https://api.soundcloud.com/me/activities?limit=5&duration[from]=1800000&oauth_token=' + token + '').
			success(function(data) {
				//console.log(data);
				deferred.resolve(data);
			}).
			error(function(data) {
				console.log('error');
				deferred.reject("Error! @factory.getAllConsultedClientsLogs");
			});
			return deferred.promise;
		}

	}]);


// soundcloudAppService.service('dataService', ['$http', 'SoundcloudService', function($http, SoundcloudService) {
// 	var token = SoundcloudService.getToken();
// 	delete $http.defaults.headers.common['X-Requested-With'];
// 	this.getData = function(limit) {
// 		// $http() returns a $promise that we can add handlers with .then()
// 		// return $http({
// 		// 	method: 'GET',
// 		// 	url: 'https://api.soundcloud.com/me/activities?limit=150&duration[from]=1800000&oauth_token=' + token + ''
// 		// });
// 		return $http.get('https://api.soundcloud.com/me/activities?limit=' + limit + '&duration[from]=1800000&oauth_token=' + token + '').
// 		success(function(data) {
// 			// $scope.data = data;
// 			// $scope.name = data.name;
// 			// $scope.salutation = data.salutation;
// 			// $scope.greeting = data.greeting;

// 			console.log(data);
// 		}).
// 		error(function(data) {
// 			console.log('error');
// 		});

// 	}
// }]);


// soundcloudAppService
// 	.service('dataService1', function($http, $q) {
// 			this.getUsers = function() {
// 				var deferred = $q.defer();
// 				var url = "https://api.soundcloud.com/me/activities?limit=150&duration[from]=1800000&oauth_token=1-89994-86755-98234564099ee36580?callback=JSON_CALLBACK";
// 				$http.get(url).success(function(data, status, headers, config) {
// 					console.log(data);
// 					deferred.resolve(data);
// 				}).error(function(data, status, headers, config) {
// 					//this always gets called
// 					console.log(status);
// 					deferred.reject(status);
// 				});
// 				return deferred.promise;
// 			}
// 	});


