angular.module("authService", [])
    
    .factory("Auth", function($http, AuthToken){
        const authFactory = {};

        // Auth.login(loginData)
        authFactory.login = loginData => $http.post("/api/authentication/login", loginData)
            .then(response => {
                AuthToken.setToken(response.data.Token);
                return response;
            });

        // Auth.isLoggedIn()
        authFactory.isLoggedIn = () => {
            if(AuthToken.getToken()){
                return true;
            } else {
                return false;
            }
        };

        // Auth.logout()
        authFactory.logout = () => {
            AuthToken.setToken();
        };

        return authFactory;
    })
    
    .factory("AuthToken", function($window){
        const authTokenFactory = {};

        // AuthToken.setToken(token)
        authTokenFactory.setToken = token => {
            if(token){
                $window.localStorage.setItem("token", token);
            } else {
                $window.localStorage.removeItem("token");
            }
            
        };

        // AuthToken.getToken()
        authTokenFactory.getToken = () => $window.localStorage.getItem("token");

        return authTokenFactory;
    });
