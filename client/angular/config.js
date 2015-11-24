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
    .when('/services',{
      templateUrl: 'partials/nav/services.html'
    })
    .when('/signup',{
      templateUrl:'partials/nav/signup.html'
    })
    .when('/login',{
      templateUrl:'partials/nav/login.html'
    })
    .when('/trusted',{
      templateUrl:'partials/services/trusted.html'
    })
    .when('/news',{
      templateUrl:'partials/services/news.html'
    })
    .when('/1040',{
      templateUrl:'partials/download/download.html'
    })    
    .when('/results',{
      templateUrl:'partials/tax_return/results.html'
    })
});
