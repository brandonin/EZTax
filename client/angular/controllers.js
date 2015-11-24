app.controller("UsersController", function($scope, UserFactory) {
	UserFactory.getUsers(function (data) {
		$scope.users = data;
	});
	$scope.addUser = function() {
		UserFactory.addUser($scope.new_user, function(errs) {
			// if we have errs display the message
			if(errs){
				$scope.errors = errs;
			} else {
			// else do the get customers stuff below
			UserFactory.getUsers(function (output) {
				$scope.users(output);
				$scope.new_user = {};
			});
			}
			
		});
	};
	$scope.removeUser = function(name) {
		UserFactory.removeUser(name, function() {
		});
	}
});