angular.module("mainController", ["authService"])

    .controller("mainCtrl", function(Auth, $location, $timeout) {

        const app = this;

        if(Auth.isLoggedIn()){
            console.log("Success: User loggedIn");        
        } else {
            console.log("Failure: User NOT loggedIn");
        }

        this.doLogin = loginData => {

            app.errorMsg = false;

            Auth.login(app.loginData).then(response => {
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

        this.logout = () => {
            Auth.logout();
            $location.path("/logout");
            $timeout(() => {
                $location.path("/");
            }, 2000);
        };

    });

