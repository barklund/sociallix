App.service('dataService', function() {
	var data = [];
	
	var addData = function(msg, date) {
		data.push({message:msg, date:date});
	}
	
	var getData = function() {
		data.sort(function (a, b) {
			if (a.date > b.date) return 1;
			if (a.date < b.date) return -1;
			return 0;
		});
		return data;
	}
	
	return {
		add: addData,
		get: getData
	};
});