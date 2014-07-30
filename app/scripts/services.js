'use strict';

var Token;

var soundcloudAppService = angular.module('soundcloudApp.services', []);

soundcloudAppService
	.service('SoundcloudService', ['$window', 'localStorageService', '$http', function($window, localStorageService, $http) {

		// this.helloInit = function() {
		// 	soundcloud: '0f8f602ff7b13a1110193701aa99aa73'
		// }, {
		// 	redirect_uri: 'http://localhost/soundcloud/app/callback.html'
		// };

		// /* Login */
		// this.helloLogin = function() {
		// 	// hello.init({
		// 	// 	soundcloud: '0f8f602ff7b13a1110193701aa99aa73'
		// 	// }, {
		// 	// 	redirect_uri: 'http://localhost/soundcloud/app/callback.html'
		// 	// });

		// 	var token = hello('soundcloud').getAuthResponse().access_token;
		// 	console.log('token: ' + token);

		// 	hello("soundcloud").login(function() {
		// 		//console.log(hello('soundcloud').getAuthResponse());
		// 	});
		// };

		// /* Log Out */
		// this.helloLogout = function() {
		// 	hello("soundcloud").logout(function() {
		// 		// console.log("Log out");
		// 		// console.log(hello('soundcloud').getAuthResponse());
		// 	});
		// };

		// initiate auth popup
		//this.helloInit = function() {
		SC.initialize({
			client_id: clientID,
			redirect_uri: callbackUrl,
			response_type: "code_and_token",
			scope: 'non-expiring'
		});
		//};

		var token;

		// this.init = function(token) {
		// 	$http.defaults.headers.common['X-Access-Token'] = token || $cookies.token;
		// }

		this.connect = function() {
			//$window.location.href = 'https://soundcloud.com/connect?client_id=' + clientID + '&redirect_uri=' + callbackUrl + '&response_type=token&scope=non-expiring&display=next';
			SC.connect(function() {
				SC.get('/me', function(me) {
					//var url = window.location.href;
					token = SC.accessToken();
					console.log('token: ' + token);
					var tokenStorage = localStorageService.set('token', token);
					//console.log('tokenStorage: ' + localStorageService.get('token'));
					return me;
				});
			});
		},

		this.me = function() {
			// SC.get('/me', function(me) {
			// 	return me;
			// 	console.log('me: ' + me);
			// });
		}

		this.clearLocalstorage = function() {
			localStorageService.clearAll();
		}

		this.setToken = function() {
			// var tokenStorage = localStorageService.set('token', token);
			console.log('tokenStorage: ' + localStorageService.get('token'));
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
		var token = getToken();
		delete $http.defaults.headers.common['X-Requested-With'];
		this.getData = function(limit) {
			// $http() returns a $promise that we can add handlers with .then()
			// return $http({
			// 	method: 'GET',
			// 	url: 'https://api.soundcloud.com/me/activities?limit=150&duration[from]=1800000&oauth_token=' + token + ''
			// });
			return $http.get('https://api.soundcloud.com/me/activities?limit=' + limit + '&duration[from]=1800000&oauth_token=' + token + '').
			success(function(data) {
				// $scope.data = data;
				// $scope.name = data.name;
				// $scope.salutation = data.salutation;
				// $scope.greeting = data.greeting;

				console.log(data);
			}).
			error(function(data) {
				console.log('error');
			});
		}

	}]);

soundcloudAppService
	.factory('AuthenticationService', function() {
		var auth = {
			isAuthenticated: false,
			isAdmin: false
		}

		return auth;
	});

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


soundcloudAppService
	.factory('authInterceptor', ['$rootScope', '$q', '$window', function($rootScope, $q, $window) {
		var tokenStorage;
		return {
			request: function(config) {
				config.headers = config.headers || {};
				if (tokenStorage !== null) {
					config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
				}
				return config;
			},
			response: function(response) {
				if (response.status === 401) {
					// handle the case where the user is not authenticated
				}
				return response || $q.when(response);
			}
		};
}]);

soundcloudAppService
	.service('dataService1', function($http, $q) {
			this.getUsers = function() {
				var deferred = $q.defer();
				var url = "https://api.soundcloud.com/me/activities?limit=150&duration[from]=1800000&oauth_token=1-89994-86755-98234564099ee36580?callback=JSON_CALLBACK";
				$http.get(url).success(function(data, status, headers, config) {
					console.log(data);
					deferred.resolve(data);
				}).error(function(data, status, headers, config) {
					//this always gets called
					console.log(status);
					deferred.reject(status);
				});
				return deferred.promise;
			}
	});


