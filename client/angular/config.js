var app = angular.module('app', ['ngRoute']);

app.config(function ($routeProvider) {
  $routeProvider
    .when('/',{
        templateUrl: 'partials/home.html'
    })   
    .when('/dashboard',{
        templateUrl: 'partials/dashboard.html'
    })
   .when('/tax_return',{
        templateUrl: 'partials/tax_return/start.html'
    })   
});