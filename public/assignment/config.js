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
                    controller: "RegisterController"
                })
                .when('/login',{
                    templateUrl: "views/users/login.view.html",
                      controller: "logincontroller"
                })
                .when('/profile',{
                    templateUrl: "views/users/profile.view.html",
                    controller: "ProfileController"
                })
                .when('/admin',{
                    templateUrl: "views/admin/admin.view.html",
                    controller: "AdminController"

                })
                .when('/forms',{
                    templateUrl: "views/forms/forms.view.html",
                    controller:"FormController"

                })
                .when('/fields',{
                    templateUrl: "views/forms/fields.view.html"


                })
                .when('/home',{
                    templateUrl: "views/home/home.view.html",
                    controller: "homecontroller"

                })
                .otherwise({
                    redirectTo:"/"
                });
        });
})();


