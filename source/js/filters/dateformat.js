App.filter('dateformat', function() {
	return function(str) {
		var y = str.substr(2,2);
		var m = parseInt(str.substr(5,2));
		var d = parseInt(str.substr(8,2));
		return d+"."+m+"."+y;
	};
});