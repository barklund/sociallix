var App = angular.module('sociallix', ['ngRoute','templates','ngFacebook']);

App
	.config(function($routeProvider, $locationProvider) {
		$routeProvider
			.when('/', {  templateUrl: 'states/main.html', controller: 'MainCtrl'  })
			.when('/facebook', {  templateUrl: 'states/facebook.html', controller: 'FacebookCtrl'  })
			.when('/parse', {  templateUrl: 'states/parse.html', controller: 'ParseCtrl'  })
			.otherwise({
				redirectTo: '/'
			});
	})
	.config(function($facebookProvider) {
		$facebookProvider.setAppId('555763154530326');
		$facebookProvider.setPermissions('user_status');
		$facebookProvider.setCustomInit({
			version    : 'v2.0'
		});
	})
	.run(function() {
		(function(d, s, id){
			var js, fjs = d.getElementsByTagName(s)[0];
			if (d.getElementById(id)) {return;}
			js = d.createElement(s); js.id = id;
			js.src = "//connect.facebook.net/en_US/sdk.js";
			fjs.parentNode.insertBefore(js, fjs);
       }(document, 'script', 'facebook-jssdk'));
    })