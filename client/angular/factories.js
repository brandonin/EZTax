app.factory('UserFactory', function($http) {
	var factory = {};
	var users = [];
	var errors;
	factory.getUsers = function(callback) {
		$http.get('/users').success(function(output){
			users = output;
			callback(users);
		});
	};
	factory.addUser = function(info, callback) {
		var count = 0;
		for(var user in users) {
			if(info.name == users[user].name)
			{
				count++;
			}
		}
		if(count>0) {
			errors = {message: "Username already exists"};
			callback(errors)
		} else {
			$http.post('/addUser', info).success(function (output) {
				users.push({name: info.name, created_at: new Date()})
			});
		}
		
	};
	factory.removeUser = function(info, callback) {
		$http.get('/removeUser/' + info, info).success(function (output) {
			users.splice(users.indexOf(info), 1);
		});
	};
	return factory;
});