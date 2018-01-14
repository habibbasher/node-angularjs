angular.module("userController", ["userService"])
    .controller("regCtrl", function($location, $timeout, User) {

        let app = this;

        this.registerUser = function(regData){

            app.errorMsg = false;

            User.create(app.regData).then((response) => {
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
