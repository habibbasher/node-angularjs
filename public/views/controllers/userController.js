angular.module("userController", [])
    .controller("regCtrl", function($http, $location, $timeout) {
        let app = this;
        this.registerUser = function(regData){
            app.errorMsg = false;
            $http.post("/api/authentication/register", this.regData)
            .then((response) => {
                if(response.data.success) {
                    app.successMsg = `${response.data.message} ...Redirecting`;
                    $timeout(() => {
                        $location.path("/");
                    }, 2000);
                } else {
                    app.errorMsg = response.data.message;
                }
            })
            .catch((err) => {
                app.errorMsg = err.data.message;
            });
        };
        
    });


    // http://localhost:8081/api/authentication/register