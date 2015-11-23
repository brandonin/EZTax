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
	var mortgageInterest;
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
			$scope.deductionAge = deductionAge;
		} else if(data > 65 && $scope.deduction == 6300) {
			deductionAge = 7850;
			$scope.deductionAge = deductionAge;
		} else if(data < 65 && ($scope.deduction == 12600 || $scope.deduction == 14150)) {
			deductionAge = 12600;
			$scope.deductionAge = deductionAge;
		} else if(data > 65 && $scope.deduction == 12600) {
			deductionAge = 14150;
			$scope.deductionAge = deductionAge;
		}
		$scope.deduction = deductionAge;
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
		studentLoanInterest = parseInt(data);
		$scope.studentInterest = studentLoanInterest;
		// $scope.deduction = $scope.deductionAge + studentLoanInterest;
		// if(!data){
		// 	$scope.deduction= $scope.deductionAge;
		// }
		$scope.adjustments = studentLoanInterest;
	}
	$scope.federalTaxesWithheld = function (data) {
		federalTaxesWithheld = data;
		$scope.taxesWithheld = federalTaxesWithheld;
	}
	$scope.medicalExpenses = function (data) {
		medicalExpenses = parseInt(data);
		$scope.medical = medicalExpenses;
		if(medicalExpenses && $scope.state && $scope.mortgage){
			console.log(1);
			$scope.itemizedDeduction = $scope.medical + $scope.state + $scope.mortgage;
		} else if(medicalExpenses && $scope.state && !$scope.mortgage){
			console.log(2);
			$scope.itemizedDeduction = $scope.state + $scope.medical;
		} else if(medicalExpenses && $scope.mortgage && !$scope.state){
			console.log(3);
			$scope.itemizedDeduction = $scope.medical + $scope.mortgage;
		} else if(medicalExpenses == NaN && $scope.mortgage && !$scope.state){
			console.log(4);
			$scope.itemizedDeduction = $scope.mortgage;
		} else if(medicalExpenses == NaN && !$scope.mortgage && $scope.state){
			console.log(5);
			$scope.itemizedDeduction = $scope.state;
		} else if(medicalExpenses && !$scope.mortgage && !$scope.state){
			console.log(6);
			$scope.itemizedDeduction = $scope.medical;
		} else {
			console.log(9);
			$scope.itemizedDeduction = $scope.mortgage + $scope.state;
		} 
		if($scope.itemizedDeduction > $scope.deductionAge){
			$scope.deduction = $scope.itemizedDeduction;
			console.log(7);
		} else if($scope.itemizedDeduction < $scope.deductionAge){
			console.log(8);
			$scope.deduction = $scope.deductionAge;
		}
	}
	$scope.stateTaxes = function (data) {
		stateTaxes = parseInt(data);
		$scope.state = stateTaxes;
		console.log(stateTaxes)
		if(stateTaxes && $scope.medical && $scope.mortgage){
			console.log(1);
			$scope.itemizedDeduction = $scope.medical + $scope.state + $scope.mortgage;
		} else if(stateTaxes && $scope.medical && !$scope.mortgage){
			console.log(2);
			$scope.itemizedDeduction = $scope.state + $scope.medical;
		} else if(stateTaxes && $scope.mortgage && !$scope.medical){
			console.log(3);
			$scope.itemizedDeduction = $scope.state + $scope.mortgage;
		} else if(stateTaxes == NaN && $scope.mortgage && !$scope.medical){
			console.log(4);
			$scope.itemizedDeduction = $scope.mortgage;
		} else if(stateTaxes == NaN && !$scope.mortgage && $scope.medical){
			console.log(5);
			$scope.itemizedDeduction = $scope.medical;
		} else if(stateTaxes && !$scope.mortgage && !$scope.medical){
			console.log(6);
			$scope.itemizedDeduction = $scope.state;
		} else {
			console.log(9);
			$scope.itemizedDeduction = $scope.mortgage + $scope.medical;
		} 
		if($scope.itemizedDeduction > $scope.deductionAge){
			$scope.deduction = $scope.itemizedDeduction;
			console.log(7);
		} else if($scope.itemizedDeduction < $scope.deductionAge){
			console.log(8);
			$scope.deduction = $scope.deductionAge;
		}
	}
	$scope.mortgageInterest = function (data) {
		mortgageInterest = parseInt(data);
		$scope.mortgage = mortgageInterest;
		console.log($scope.mortgage)
		if(mortgageInterest && $scope.state && $scope.medical){
			console.log(1);
			$scope.itemizedDeduction = $scope.medical + $scope.state + $scope.mortgage;
		} else if(mortgageInterest && $scope.state && !$scope.medical){
			console.log(2);
			$scope.itemizedDeduction = $scope.state + $scope.mortgage;
		} else if(mortgageInterest && $scope.medical && !$scope.state){
			console.log(3);
			$scope.itemizedDeduction = $scope.medical + $scope.mortgage;
		} else if(mortgageInterest == NaN && $scope.medical && !$scope.state){
			console.log(4);
			$scope.itemizedDeduction = $scope.medical;
		} else if(mortgageInterest == NaN && !$scope.medical && $scope.state){
			console.log(5);
			$scope.itemizedDeduction = $scope.state;
		} else if(mortgageInterest && !$scope.mortgage && !$scope.state){
			console.log(6);
			$scope.itemizedDeduction = $scope.mortgage;
		} else {
			console.log(9);
			$scope.itemizedDeduction = $scope.medical + $scope.state;
		} 
		if($scope.itemizedDeduction > $scope.deductionAge){
			$scope.deduction = $scope.itemizedDeduction;
			console.log(7);
		} else if($scope.itemizedDeduction < $scope.deductionAge){
			console.log(8);
			$scope.deduction = $scope.deductionAge;
		}
	}
});