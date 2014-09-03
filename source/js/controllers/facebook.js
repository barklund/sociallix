App.controller('FacebookCtrl', function ($scope, $location, $facebook, $q, dataService) {
	$scope.loads = $scope.loaded = $scope.value = 0;
	
	var me = null;
	
	function loadData() {
		var t0 = new Date();
		$facebook.api('/me').then(function(res) {
			me = res.id;
			$q.all([
				getData("/me/statuses?fields=message,updated_time,comments.fields(from,message,created_time)"),
				getData("/me/links?fields=message,created_time,comments.fields(from,message,created_time)"),
				getData("/me/photos?fields=from,name,created_time,comments.fields(from,message,created_time)")
			]).then(function() {
				$location.path('/parse');
			});
		});
	}
	
	function getData(d) {
		var b = 100;
		var a = 8;
		var promises = []
		for (var c = 0; c < a; c++) {
			$scope.loads++;
			(function(defer) {
				promises.push(defer.promise);
				$facebook.api(d + "&limit=" + b + "&offset=" + b * c).then(function(f) {
					$scope.loaded++;
					$scope.value = Math.round($scope.loaded * 100 / $scope.loads);
					if (f.error) {
						console.log(d, f.error.message);
					} else if (f && f.data && f.data.length) {
						var i = f.data;
						for (j = 0; j < i.length; j++) {
							var g = i[j];
							if (!g.from || g.from.id == $scope.myUID) {
								var h = g.message;
								if (!h) {
									h = g.name;
								}
								var t = g.created_time;
								if (!t) {
									t = g.updated_time;
								}
								if (h) {
									dataService.add(h, t);
								}
							}
							var l = g.comments;
							if (!l || !l.data || !l.data.length) {
								continue;
							}
							for (var e = 0; e < l.data.length; e++) {
								var m = l.data[e];
								if (m.from && m.from.id == me && m.message) {
									dataService.add(m.message, m.created_time);
								}
							}
						}
					}
					defer.resolve();
				});
			})($q.defer());
		}
		return $q.all(promises);
	}
	
	loadData();
});