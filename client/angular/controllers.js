app.controller("UsersController", function($scope, UserFactory) {
	$scope.user = 
	$scope.addUser = function() {
		UserFactory.addUser($scope.new_user, function(errs) {

		});
	};
});