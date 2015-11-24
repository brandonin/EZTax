app.factory('UserFactory', function($http) {
	var factory = {};
	var users = [];
	var user = {};
	var errors;
	factory.getUsers = function(callback) {
		$http.get('/users').success(function(output){
			users = output;
			callback(users);
		});
	};
	factory.addUser = function(info, callback) {
		$http.post('/addUser', info).success(function (output) {
			user = output;
			callback(user);
		});
	};
	factory.removeUser = function(info, callback) {
		$http.get('/removeUser/' + info, info).success(function (output) {
			users.splice(users.indexOf(info), 1);
		});
	};
	return factory;
});