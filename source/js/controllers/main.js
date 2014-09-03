App.controller('MainCtrl', function ($scope, $location, $routeParams, $facebook) {
	$scope.connectFacebook = function() {
		$facebook.login().then(function(response) {
			if (response.status === "connected") {
				$location.path("/facebook");
			}
		});
	};
});