app.controller("TaxController", function($scope) {
	var test = null;
	$scope.single = function() {
		test = "I'm Single!";
		$scope.tax = test;
	};
	$scope.married = function() {
		test = "I'm Married!";
		$scope.tax = test;
		console.log($scope.tax);
	};
});