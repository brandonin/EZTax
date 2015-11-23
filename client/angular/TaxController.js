app.controller("TaxController", function($scope) {
	var deductionMaritalStatus = null;
	var deductionAge = null;
	var exemptionDependent = null;
	$scope.single = function() {
		deductionMaritalStatus = "$6,300";
		$scope.deduction = deductionMaritalStatus;
	};
	$scope.married = function() {
		deductionMaritalStatus = "$12,600";
		$scope.deduction = deductionMaritalStatus;
	};
	$scope.age = function(data) {
		if(data < 65 && ($scope.deduction == "$6,300"|| $scope.deduction == "$7,850")){
			deductionAge = "$6,300";
		} else if(data > 65 && $scope.deduction == "$6,300") {
			deductionAge = "$7,850";
		} else if(data < 65 && ($scope.deduction == "$12,600" || $scope.deduction == "$14,150")) {
			deductionAge = "$12,600";
		} else if(data > 65 && $scope.deduction == "$12,600") {
			deductionAge = "$14,150";
		}
		$scope.deduction = deductionAge;
		console.log("on-change", $scope.deduction);
	}
	$scope.dependent = function(){
		exemptionDependent = "$0.00";
		$scope.exemption = exemptionDependent;
	}
	$scope.notDependent = function(){
		exemptionDependent = "$4,000";
		$scope.exemption = exemptionDependent;
	}
	$scope.kids = function() {

	}
	$scope.noKids = function() {
		
	}
});