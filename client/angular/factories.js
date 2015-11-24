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
	return factory;
});