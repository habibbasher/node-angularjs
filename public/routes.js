angular.module("appRoutes", ["ngRoute"])
    .config(['$routeProvider', "$locationProvider", ($routeProvider, $locationProvider) =>{
       $routeProvider.when("/", {
           templateUrl: "views/pages/home.html"
       })
       .when("/about", {
           templateUrl: "views/pages/about.html"
       })
       .otherwise({ redirectTo: '/' });

       $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
       });

    }]);