angular.module("userService", [])
    .factory("User", function($http){
        userFactory = {};

        userFactory.create = function (regData){
            return $http.post("/api/authentication/register", regData)
        }

        return userFactory;
    });

