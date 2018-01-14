angular.module("mainController", ["authService"])

    .controller("mainCtrl", function(Auth, $location, $timeout) {

        let app = this;

        this.doLogin = function(loginData){

            app.errorMsg = false;

            Auth.login(app.loginData).then((response) => {
                if(response.data.success) {
                    app.successMsg = `${response.data.message} ...Redirecting`;
                    $timeout(() => {
                        $location.path("/about");
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

