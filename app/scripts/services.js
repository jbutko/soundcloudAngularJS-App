'use strict';

var Token;

angular
	.module('soundcloudApp.services', [])
	.service('SoundcloudService', ['$window', 'localStorageService', '$http', '$q', 'Restangular', '$rootScope',
		function($window, localStorageService, $http, $q, Restangular, $rootScope) {

		var token,
			tokenStorage,
			// restangular parameters
			params = {
				client_id: 'xxxx', // add your client_id
				oauth_token: localStorageService.get('token')
			};

		// send oauth_token with every request
		Restangular.setDefaultRequestParams({ oauth_token: params.oauth_token });

		// initiate auth popup
		SC.initialize({
			client_id: clientID,
			redirect_uri: callbackUrl,
			response_type: "code_and_token",
			scope: 'non-expiring'
		});

		// authorization function
		this.connect = function() {
			var deferred = $q.defer();
			SC.connect(function() {
				SC.get('/me', function(me) {
					token = SC.accessToken();
					localStorageService.set('token', token);
					localStorageService.set('me', me);
				});

				deferred.resolve();
			});
			return deferred.promise;
		},

		// get information about user
		this.me = function() {
			// get token to authenticate communication
			if (localStorageService.get('token') === null) {
				var oauth_token = SC.accessToken()
			} else {
				var oauth_token = localStorageService.get('token')
			}

			// Restangular.setDefaultRequestParams($rootScope.oauth);
			Restangular.setDefaultRequestParams({
				oauth_token: oauth_token
			});
			var data = Restangular.one('me').get();
			var deferred = $q.defer();
			deferred.resolve(data);
			return deferred.promise;
		}

		this.clearLocalstorage = function() {
			localStorageService.remove('me');
			localStorageService.clearAll();
		}

		this.setToken = function() {
			var tokenStorage = localStorageService.set('token', token);
		}

		this.getToken = function() {
			var returnedToken;
			return returnedToken = localStorageService.get('token');
		}

		this.login = function() {
			SC.connect(function() {
				SC.get('/me', function(me) {
					console.log('Hello, ' + me.username);
				});
			});
		};

		this.logout = function() {
			localStorageService.clearAll();
		};

		 // load last tracks from user's soundcloud feed
		this.getData = function() {
			// get token to authenticate communication
			if (localStorageService.get('token') === null) {
				var oauth_token = SC.accessToken()
			} else {
				var oauth_token = localStorageService.get('token')
			}
			var deferred = $q.defer();
			// $http() returns a $promise that we can then handle with .then() in controller
			$http.get('https://api.soundcloud.com/me/activities?limit=50&oauth_token=' + oauth_token + '').
			//$http.get('https://api.soundcloud.com/me/activities?limit=50&duration[from]=18000&oauth_token=' + oauth_token + '').
			//$http.get('https://api.soundcloud.com/me/activities?oauth_token=' + oauth_token + '').
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
