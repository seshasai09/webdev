(function(){
    angular.module("FormBuilderApp")
        .config(function($routeProvider){
            $routeProvider
                //.when('/',{
                //    templateUrl: "/index.html",
                //    //controller: "MainController"
                //})
                .when('/register',{
                    templateUrl: "views/users/register.view.html",
                    controller: "RegisterController",
                    controllerAs: "model"
                })
                .when('/login',{
                    templateUrl: "views/users/login.view.html",
                    controller: "logincontroller",
                    controllerAs: "model"
                })
                .when('/profile',{
                    templateUrl: "views/users/profile.view.html",
                    controller: "ProfileController",
                    controllerAs: "model",
                    resolve: { // when user wants to go to profile page we check if user is loged in
                        checkLoggedIn: checkLoggedIn // this function is asking to be resolved/reject
                        // we are configuring dependecies. Angular allows us to do. So before going to profile page we check if user
                        // is looged in
                    }
                })
                .when('/admin',{
                    templateUrl: "views/admin/admin.view.html",
                    controller: "AdminController",
                    controllerAs: "model",
                    resolve: {
                        checkLoggedIn: checkLoggedIn
                    }

                })
                .when('/forms',{
                    templateUrl: "views/forms/forms.view.html",
                    controller:"FormController",
                    controllerAs: "model",
                    resolve: {
                        checkLoggedIn: checkLoggedIn
                    }

                })
                .when('/form/:formId/fields',{
                    templateUrl: "views/forms/fields.view.html",
                    controller: "FieldController",
                    controllerAs: "model",
                    resolve: {
                        checkLoggedIn: checkLoggedIn
                    }


                })
                .when('/home',{
                    templateUrl: "views/home/home.view.html",
                    controller: "homecontroller",
                    controllerAs: "model",
                    resolve: {
                        checkLoggedIn: checkLoggedIn
                    }

                })
                .otherwise({
                    redirectTo:"/"
                });

            function checkLoggedIn(UserService,$q,$location){
                var deferred = $q.defer(); // create instance of deferred object which contains promise
                // to resolve we are explicity using angulars $q angulars promise. We can create and

                UserService.getCurrentUser()
                    .then(function(response){
                        var currentUser= response.data;
                        if(currentUser){
                            console.log(currentUser);
                            UserService.setCurrentUser(currentUser);
                            console.log("user logged in");
                            deferred.resolve();//manage the promise bt resolving it
                        }else{
                            deferred.reject();//rejecting the promise
                          //  console.log("user not logged iin");
                            $location.url("/login");
                        }
                    });
                return deferred.promise;
            }

        });
})();


