app.controller("TaxController", function($scope, TaxFactory) {
	var deductionMaritalStatus = null;
	var deductionAge = null;
	var exemptionDependent = null;
	var kids = false;
	var dependents = 0;
	var isDependent = false;
	var numberOfDependents = 0;
	var federalTaxesWithheld;
	var mortgageInterest;
	var educational_credit;
	var AOC;
	if(!$scope.incomeTotal) {
		$scope.incomeTotal = 0;
	}
	// $scope.$watch($scope, function(){
	// 	alert("test");
	// });
	$scope.forecastedReturn = $scope.incomeTotal;

	$scope.single = function(info) {

		TaxFactory.maritalStatus(info, function (output) {
			console.log(output)
			// $scope.tax(output);
			info = {};
		});
		$scope.maritalStatus = "Single";
		deductionMaritalStatus = 6300;
		$scope.deduction = deductionMaritalStatus;
	};
	$scope.married = function(info) {
		TaxFactory.maritalStatus(info, function (output) {
			info = {};
		})
		$scope.maritalStatus = "Married";
		deductionMaritalStatus = 12600;
		$scope.deduction = deductionMaritalStatus;
	};
	$scope.age = function() {
		TaxFactory.age($scope.tax, function (output) {
		$scope.deduction = output;

		})
	}
	$scope.isaDependent = function(info){
		TaxFactory.isDependent(info, function(output) {
			$scope.exemption = output.exemption;
			$scope.isDependent = output.isDependent;
		})

	}
	$scope.yesKids = function() {
		kids = true;
		$scope.kids = kids;
	}
	$scope.noKids = function() {
		kids = false;
		$scope.kids = kids;
	}
	$scope.claimedDependents = function () {
		TaxFactory.claimedDependents($scope.tax, function (output) {
			console.log(output)
		$scope.numberOfDependents=output.dependents;
		if(output.dependents > 0){	
		$scope.exemption = output.exemptionDependent + $scope.exemption;
		} else if(output.dependents == 0) {
			$scope.exemption = 4000;
		}
		})
	}
		$scope.taxableWage = function (){
		TaxFactory.taxableWage($scope.tax, function (output){
			$scope.wageTaxable = output;
		});
	}

	$scope.netBusinessIncome = function (){
		TaxFactory.netBusinessIncome($scope.tax, function (output){
			$scope.businessIncome = output;
		});
	}

	$scope.interestIncome = function (){
		TaxFactory.interestIncome($scope.tax, function (output){
			$scope.incomeInterest = output;
		});
	}

	$scope.dividendIncome = function (){
		TaxFactory.dividendIncome($scope.tax, function (output){
			$scope.incomeDividend = output;
		});
	}

	$scope.stateTaxRefund = function (){
		TaxFactory.stateTaxRefund($scope.tax, function (output){
			$scope.taxRefundState = output;
		});
	}

	$scope.totalIncome = function () {
		TaxFactory.totalIncome(function (output){
			$scope.incomeTotal = output;
		})
	}

	$scope.studentLoanInterest = function () {
		TaxFactory.studentLoanInterest($scope.tax, function (output){
			$scope.studentInterest = output;
			$scope.adjustments = $scope.studentInterest;
		});
	}
	$scope.federalTaxesWithheld = function () {
		TaxFactory.federalTaxesWithheld($scope.tax, function (output){
			$scope.taxesWithheld = output;		
		})
	}
	$scope.expenses = function (){
		TaxFactory.expenses($scope.tax, function (output){
			$scope.medicalExpenses = output.medicalExpenses;
			$scope.deduction = output.deduction;
		})
	}
	$scope.paysEducationExpenses = function () {
		education = true;
		$scope.education = education;
	}
	$scope.noEducationExpenses = function () {
		education = false;
		$scope.education = education;
	}
	$scope.student = function (data) {
		TaxFactory.student(data, function (output){
		})
	}
	$scope.educationExpenses = function () {
		TaxFactory.educationExpenses($scope.tax, function (output) {
			$scope.education_credit = output.education_credit;
			$scope.AOC = output.AOC;
			console.log(output)
		})

		// console.log($scope.education_credit, $scope.AOC);
	}
});