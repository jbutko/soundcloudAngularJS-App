'use strict';

// var soundcloudAppCtrl = angular.module('soundcloudApp.controller', []);

angular
	.module('soundcloudApp.controller', [])
	.controller('MainCtrl', ['$scope', 'SoundcloudService', 'localStorageService', '$q', 'Restangular', '$timeout',
	function($scope, SoundcloudService, localStorageService, $q, Restangular, $timeout) {

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

		// get and process data from SC API
		SoundcloudService.getData().then(function(data) {

			// flatten basic array from response (data.collection)
			$scope.dataraw = _.flatten(data.collection, 'origin');
			var limit = limit ? limit : 10;
			$scope.data = _.filter($scope.dataraw, function(num, index) { return index < limit });

			// assign data to a variable
			var data1 = $scope.data;

			// var iframe = document.querySelector('.iframe'),
			// 	widgetUrl = $scope.data1.uri,
			// 	iframe.src = 'http://wt.soundcloud.com/player/' + "?url=" + widgetUrl;

			// limit number of tracks
			$scope.numberOfTracks = function(limit) {
					var limit = limit ? limit : 10,
						data = data1;
					// if 'tracksLimit' input field is empty list all tracks
			    	if (!document.forms["limitForm"]["tracksLimit"].value) {
			    		$scope.data = data;
			    	// otherwise limit number of tracks by user input
			    	} else {
			    		$scope.data = _.filter(data, function(num, index) { return index < limit });
			    	}

			    	// Redraw the layout please Mr. Masonry
			    	masonry(150);
			};

			// filter track lenght
			$scope.trackLength = function(durationLimit) {
				// get desired duration passed from 'durationLimit' input ng-model
				var durationLimit = durationLimit,
					// store default data
					data = data1;

				// this one filter response data based on track duration - min * ms
				$scope.data = _.filter(data, function(num, index) { return num.duration > durationLimit * 60000 });

				// Redraw the layout please Mr. Masonry
				masonry(150);
			};

			function masonry(waitTime) {
				$timeout(function() {
				   var container = document.querySelector('#masonry');
				   imagesLoaded( container, function() {
				        var msnry = new Masonry( container, {
				          // options
				          //columnWidth: 200,
				          itemSelector: '.grid_3'
				        });
				     }, waitTime);
				   });
			}

			masonry(1000);





			// console.log($scope.data);
			// _.first(x, 2): cut the lenght of the array to 2 items
			// console.log(_.first($scope.data, 2));

			// _.filter(summary.data, function(item){
			//   return item.category.parent === 'Food';
			// });
			// console.log(_.filter(data.collection, function(num) { 0
			// 	return num.origin.description === null;
			// }))
			//$scope.data = data;
			//document.getElementById("player").innerHTML = "<iframe width='100%' height='166' scrolling='no' frameborder='no' src='https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/" + $scope.data.origin.uri + "&amp;color=ff5500&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false'></iframe>"
		});

		//document.getElementById("videoTag").innerHTML = "<video width='auto' height='auto' controls autoplay src=" + $scope.details.preview + ">Your browser does not support video</video>"


	}])
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



