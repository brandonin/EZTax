app.controller("TaxController", function($scope) {
	var deductionMaritalStatus = null;
	var deductionAge = null;
	var exemptionDependent = null;
	var kids = false;
	var dependentsUnder16 = 0;
	var dependentsOver17 = 0;
	var isDependent = false;
	var numberOfDependents = 0;
	var federalTaxesWithheld;
	if(!$scope.incomeTotal) {
		$scope.incomeTotal = 0;
	}
	$scope.single = function() {
		deductionMaritalStatus = 6300;
		$scope.deduction = deductionMaritalStatus;
	};
	$scope.married = function() {
		deductionMaritalStatus = 12600;
		$scope.deduction = deductionMaritalStatus;
	};
	$scope.age = function(data) {
		if(data < 65 && ($scope.deduction == 6300|| $scope.deduction == 7850)){
			deductionAge = 6300;
		} else if(data > 65 && $scope.deduction == 6300) {
			deductionAge = 7850;
		} else if(data < 65 && ($scope.deduction == 12600 || $scope.deduction == 14150)) {
			deductionAge = 12600;
		} else if(data > 65 && $scope.deduction == 12600) {
			deductionAge = 14150;
		}
		$scope.deduction = deductionAge;
		console.log("on-change", $scope.deduction);
	}
	$scope.isaDependent = function(){
		isDependent = false;
		$scope.isDependent = isDependent;
		exemptionDependent = 0;
		$scope.exemption = exemptionDependent;
		$scope.Dependent
		console.log($scope.exemption)
	}
	$scope.notaDependent = function(){
		isDependent = true;
		$scope.isDependent = isDependent;
		exemptionDependent = 4000;
		$scope.exemption = exemptionDependent;
		console.log($scope.exemption)
	}
	$scope.yesKids = function() {
		kids = true;
		$scope.kids = kids;
	}
	$scope.noKids = function() {
		kids = false;
		$scope.kids = kids;
	}
	$scope.claimedDependents = function (data) {
		dependentsUnder16 = data * 4000;
		numberOfDependents = data;
		$scope.numberOfDependents = numberOfDependents;
		console.log(dependentsUnder16)
		if(data){
			$scope.exemption = dependentsUnder16 + $scope.exemption;
			console.log("hello")
		} else{
			$scope.exemption = 4000;
		}
		console.log($scope.exemption)
	}
	// $scope.claimedDependentsOver17 = function (data) {
	// 	dependentsOver17 = data * 4000;
	// 	console.log(data)
	// 	numberOfDependents = data;
	// 	$scope.numberOfDependents = numberOfDependents;
	// 	console.log(dependentsUnder16)
	// 	if(data){
	// 		$scope.exemption = dependentsUnder16 + $scope.exemption;
	// 		console.log("hello")
	// 	} else{
	// 		$scope.exemption = 4000;
	// 	}
	// 	console.log($scope.exemption)
	// }
	$scope.totalIncome = function (data) {
		incomeTotal = data;
		$scope.incomeTotal = incomeTotal;
	}
	$scope.studentLoanInterest = function (data) {
		studentLoanInterest = data;
		$scope.studentInterest = studentLoanInterest;
		console.log($scope.deduction)
		$scope.deduction = $scope.deduction + data;
	}
	$scope.federalTaxesWithheld = function (data) {
		federalTaxesWithheld = data;
		$scope.taxesWithheld = federalTaxesWithheld;
	}
});