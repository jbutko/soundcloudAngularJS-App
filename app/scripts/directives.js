'use strict';

angular
	.module('soundcloudApp.directives', [])
	.directive('player', function() {
	  return {
	    restrict: 'E',
	    template: '<div></div>',
	    replace: true,
	    transclude: true,
	    link: function(scope, elem, attrs) {
	      scope.$watch(function() {
	      	//console.log(scope);
	        //return scope.type;
	      }, function() {
	        SC.oEmbed(scope.track.uri, {color: "000", auto_play: false, iframe: false, height: 250, show_comments: true }, function(oEmbed) {
	          elem.html(oEmbed.html);
	          //console.log(oEmbed);
	        });
	      });
	    }
	  };
	});
