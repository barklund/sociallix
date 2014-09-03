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
		for (var i = 0; i < data.length; i++) {
			console.log(data[i].date.slice(0,10));
		}
		return data;
	}
	
	return {
		add: addData,
		get: getData
	};
});