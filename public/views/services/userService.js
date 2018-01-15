angular.module("userService", [])
    .factory("User", function($http){
        const userFactory = {};

        userFactory.create = regData => $http.post("/api/authentication/register", regData);

        return userFactory;
    });

