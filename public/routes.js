angular.module("appRoutes", ["ngRoute"])
    .config(['$routeProvider', "$locationProvider", ($routeProvider, $locationProvider) =>{
       $routeProvider.when("/", {
            templateUrl: "views/pages/home.html"
       })
       .when("/about", {
            templateUrl: "views/pages/about.html"
       })
       .when("/register", {
            templateUrl: "views/pages/users/register.html",
            controller: "regCtrl",
            controllerAs: "register"
       })
       .when("/login", {
            templateUrl: "views/pages/users/login.html",
            controller: "mainCtrl",
            controllerAs: "main"
       })
       .otherwise({ redirectTo: "/" });

       $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
       });

    }]);