angular.module("authService", [])
    
    .factory("Auth", function($http){
        authFactory = {};

        authFactory.login = function (loginData){
            return $http.post("/api/authentication/login", loginData)
        }

        return authFactory;
    });
