app.factory('TaxFactory', function($http) {
	var factory = {};
	var tax = {};
	var maritalStatus;
	var standardDeduction;
	var age;
	var exemption;
	var isDependent;
	var dependents, tax_bracket;
	var taxableWage = 0, netBusinessIncome = 0, interestIncome= 0, dividendIncome = 0, stateTaxRefund= 0;
	var itemizedDeduction, medicalExpenses, stateTaxes, mortgageInterest, deduction;
	var deductionAge, students;
	var AOC, educational_credit, education_credit;
	var totalIncome, federalTaxesWithheld, adjustments, forecastedReturn, adjusted_income, tax_rate;
	var taxable_income;
	var taxDue;
	factory.getInfo = function(callback) {
		tax = {maritalStatus: maritalStatus, standardDeduction: standardDeduction, age: age, exemption: exemption, dependents: dependents, totalIncome: totalIncome, itemizedDeduction: itemizedDeduction, deduction: deduction, AOC: AOC, education_credit: education_credit, educational_credit: educational_credit, federalTaxesWithheld: federalTaxesWithheld, adjustments: adjustments, forecastedReturn: forecastedReturn, taxDue: taxDue}
		callback(tax);
	};
	factory.maritalStatus = function(info, callback){
		if(info == 'single'){
			standardDeduction = 6300;
			maritalStatus = "Single";
		} else if(info == 'married')
		{
			standardDeduction = 12600;
			maritalStatus = "Married";
		}
		tax = {name: info, standardDeduction: standardDeduction}
		callback(tax);
	};
	factory.age = function(info, callback){
		if(info.age < 65 && (standardDeduction == 6300 || standardDeduction == 7850)){
			deductionAge = 6300;
		} else if(info.age > 65 && standardDeduction == 6300) {
			deductionAge = 7850;
		} else if(info.age < 65 && (standardDeduction == 12600 || standardDeduction == 14150)) {
			deductionAge = 12600;
		} else if(info.age > 65 && standardDeduction == 12600) {
			deductionAge = 14150;
		}
		callback(deductionAge);
	}
	factory.isDependent = function(info, callback){
		if(info == "yes"){
			exemption = 0;
			isDependent = false;
		} else if (info == "no"){
			exemption = 4000;
			isDependent = true;
		}
		tax = {exemption: exemption, isDependent: isDependent}
		callback(tax)
	}
	factory.claimedDependents = function(info, callback){
		if(info.dependents){
			dependents = parseInt(info.dependents);
			exemptionDependent = dependents * 4000;
		} else {
			dependents = 0;
			exemptionDependent = 0;
		}
		tax = {dependents: dependents, exemptionDependent: exemptionDependent}
		callback(tax);
	}
	factory.taxableWage = function(info, callback){
		taxableWage = parseInt(info.taxableWage);
		callback(taxableWage);
	}
	factory.netBusinessIncome = function(info, callback){
		netBusinessIncome = parseInt(info.netBusinessIncome);
		callback(netBusinessIncome);
	}
	factory.interestIncome = function(info, callback){
		interestIncome = parseInt(info.interestIncome);
		callback(interestIncome);
	}
	factory.dividendIncome = function(info, callback){
		dividendIncome = parseInt(info.dividendIncome);
		callback(dividendIncome);
	}
	factory.stateTaxRefund = function(info, callback){
		stateTaxRefund = parseInt(info.stateTaxRefund);
		callback(stateTaxRefund);
	}
	factory.totalIncome = function(callback){
		if(!taxableWage){
			taxableWage = 0;
		}
		if(!netBusinessIncome){
			netBusinessIncome = 0;
		}
		if(!interestIncome){
			interestIncome = 0;
		}
		if(!dividendIncome){
			dividendIncome = 0;
		}
		if(!stateTaxRefund){
			stateTaxRefund = 0;
		}
		totalIncome = taxableWage + netBusinessIncome + interestIncome + dividendIncome + stateTaxRefund;
		callback(totalIncome);
	}
	factory.studentLoanInterest = function (info, callback){
		studentLoanInterest = parseInt(info.studentLoanInterest)
		adjustments = studentLoanInterest;
		callback(studentLoanInterest)
	}
	factory.federalTaxesWithheld = function (info, callback){
		federalTaxesWithheld = parseInt(info.federalTaxesWithheld)
		callback(federalTaxesWithheld);
	}
	factory.expenses = function (info, callback){
		medicalExpenses = parseInt(info.medicalExpenses);
		stateTaxes = parseInt(info.stateTaxes);
		mortgageInterest = parseInt(info.mortgageInterest);
		if(medicalExpenses && stateTaxes && mortgageInterest){
			itemizedDeduction = medicalExpenses + stateTaxes + mortgageInterest;
		} else if(medicalExpenses && stateTaxes && !mortgageInterest){
			itemizedDeduction = stateTaxes + medicalExpenses;
		} else if(medicalExpenses && mortgageInterest && !stateTaxes){
			itemizedDeduction = medical + mortgageInterest;
		} else if(medicalExpenses == NaN && mortgageInterest && !stateTaxes){
			itemizedDeduction = mortgageInterest;
		} else if(medicalExpenses == NaN && !mortgageInterest && stateTaxes){
			itemizedDeduction = stateTaxes;
		} else if(medicalExpenses && !mortgageInterest && !stateTaxes){
			itemizedDeduction = medicalExpenses;
		} else if(!medicalExpenses && !mortgageInterest && stateTaxes){
			itemizedDeduction = stateTaxes;
		} else if(!medicalExpenses && mortgageInterest && !stateTaxes){
			itemizedDeduction = mortgageInterest;
		} else {
			itemizedDeduction = mortgageInterest + stateTaxes;
		} 
		if(itemizedDeduction > deductionAge){
			deduction = itemizedDeduction;
		} else if(itemizedDeduction < deductionAge){
			deduction = deductionAge;
		}
		tax = {itemizedDeduction: itemizedDeduction, deduction: deduction, medicalExpenses: medicalExpenses, mortgageInterest:mortgageInterest, stateTaxes:stateTaxes};
		callback(tax);
	}
	factory.student = function (info, callback){
		students = info;
	}
	factory.educationExpenses = function(info, callback){
		if(students == 1 && info.educationExpenses >= 2500){
			education_credit = 1500;
			AOC = 1000;
		} else if(students == 1 && info.educationExpenses < 2500){
			educational_credit = info.educationExpenses * .6;
			education_credit = educational_credit;
			AOC = info.educationExpenses - educational_credit;
		} else if(students == 2 && info.educationExpenses >= 5000){
			education_credit = 3000;
			AOC = 2000;
		} else if(students == 2 && info.educationExpenses < 5000){
			educational_credit = info.educationExpenses * .6;
			education_credit = educational_credit;
			AOC = info.educationExpenses - educational_credit;
		} else if(students == 3 && info.educationExpenses >= 7500){
			education_credit = 4500;
			AOC = 3000;
		} else if(students == 3 && info.educationExpenses < 7500){
			educational_credit = info.educationExpenses * .6;
			education_credit = educational_credit;
			AOC = info.educationExpenses - educational_credit;
		}
		tax = {education_credit: education_credit, educational_credit: educational_credit, AOC: AOC}
		callback(tax);
	}
	factory.submiting = function() {
		if(!deduction){
			deduction = deductionAge;
		}
		if(!federalTaxesWithheld){
			federalTaxesWithheld = 0;
		}
		adjusted_income = totalIncome - deduction - exemption;
		if(adjusted_income <= 9225 && maritalStatus=="Single"){
			tax_rate = 10*.01;
		} else if(adjusted_income <=37450 && maritalStatus=="Single"){
			taxable_income = adjusted_income - 9225;
			tax_bracket= 922.5;
			tax_rate = 15*.01;
		} else if(adjusted_income <=90750 && maritalStatus=="Single"){
			taxable_income = adjusted_income - 37450;
			tax_bracket= 5156.25;
			tax_rate = 25*.01;
		} else if(adjusted_income <=189300 && maritalStatus=="Single"){
			taxable_income = adjusted_income - 90750;
			tax_bracket=18481.25;
			tax_rate = 28*.01;
		} else if(adjusted_income <=411500 && maritalStatus=="Single"){
			taxable_income = adjusted_income - 189300;
			tax_bracket=46075.25;
			tax_rate = 33*.01;
		} else if(adjusted_income <=413200 && maritalStatus=="Single"){
			taxable_income = adjusted_income - 411500;
			tax_bracket=119401.25;
			tax_rate = 35*.01;
		} else if(adjusted_income >413200 && maritalStatus=="Single"){
			taxable_income = adjusted_income - 413200;
			tax_bracket=119996.25;
			tax_rate = 39.6*.01;
		} else if(adjusted_income <=18450 && maritalStatus=="Married"){
			tax_rate = 10*.01;
		} else if(adjusted_income <=74900 && maritalStatus=="Married"){
			taxable_income = adjusted_income - 18450;
			tax_bracket=1845;
			tax_rate = 15*.01;
		} else if(adjusted_income <=151200 && maritalStatus=="Married"){
			taxable_income = adjusted_income - 74900;
			tax_bracket=10312.5;
			tax_rate = 25*.01;
		} else if(adjusted_income <=230450 && maritalStatus=="Married"){
			taxable_income = adjusted_income - 151200;
			tax_bracket=29387.5;
			tax_rate = 28*.01;
		} else if(adjusted_income <=411500 && maritalStatus=="Married"){
			taxable_income = adjusted_income - 230450;
			tax_bracket=51577.5;
			tax_rate = 33*.01;
		} else if(adjusted_income <=464850 && maritalStatus=="Married"){
			taxable_income = adjusted_income - 411500;
			tax_bracket=111324;
			tax_rate = 35*.01;
		} else if(adjusted_income >464850 && maritalStatus=="Married"){
			taxable_income = adjusted_income - 464850;
			tax_bracket=129996.5;
			tax_rate = 39.6*.01;
		}
		tax_calculation = taxable_income * tax_rate + tax_bracket - federalTaxesWithheld;
		if(tax_calculation <0)
		{
			forecastedReturn = Math.abs(tax_calculation);
		} else {
			taxDue = tax_calculation;
		}
		console.log(tax_calculation, taxable_income, tax_rate, tax_bracket, federalTaxesWithheld)
		tax = totalIncome;
	}
	return factory;
});