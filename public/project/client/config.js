(function(){
    angular.module("MSocialApp")
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
                .when('/artistProfile',{
                    templateUrl: "views/artist/artist.profile.view.html",
                    controller: "ArtistProfileController",
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
                    controller:"FormController"

                })
                .when('/fields',{
                    templateUrl: "views/forms/fields.view.html"


                })
                .when('/home',{
                    templateUrl: "views/home/home.view.html",
                    controller: "homecontroller",
                    controllerAs: "model",
                    resolve: {
                        getLoggedIn: getLoggedIn
                    }

                })
                .when('/toptracks',{
                    templateUrl: "views/getTracks/gettracks.view.html",
                    controller: "getTracksController",
                    controllerAs: "model"

                })
                .when('/searchArtist',{
                    templateUrl: "views/searchArtist/searchArtist.view.html",
                    controller: "searchArtistController",
                    controllerAs: "model"

                })
                .when('/getTracksofArtist',{
                    templateUrl: "views/searchArtistTracks/artistTracks.view.html",
                    controller: "artistTracksController",
                    controllerAs: "model"

                })
                .when('/getSearchVideos',{
                    templateUrl: "views/searchVideos/searchVideos.view.html",
                    controller: "searchVideosController",
                    controllerAs: "model"

                })
                .when('/favorites',{
                    templateUrl: "views/favorites/userFavorites.view.html",
                    controller: "favoritesController",
                    controllerAs: "model",
                    resolve: {
                        checkLoggedIn: checkLoggedIn
                    }

                })
                .when('/adminAllFunctions',{
                    templateUrl: "views/admin/admin.view.all.functions.html",
                    controller: "AdminAllFunctionsController",
                    controllerAs: "model",
                    resolve: {
                        checkLoggedIn: checkLoggedIn
                    }
                })
                .when('/discussions',{
                    templateUrl: "views/discussion/artist.discussion.list.html",
                    controller: "DiscussionController",
                    controllerAs: "model",
                    resolve: {
                        checkLoggedIn: checkLoggedIn
                    }
                })
                .when('/viewdiscussion/:artistId/discussion/:discussionId',{
                    templateUrl: "views/discussion/artist.discussion.html",
                    controller: "DiscussionController",
                    controllerAs: "model",
                    resolve: {
                        checkLoggedIn: checkLoggedIn
                    }
                })
                .when('/ourArtists',{
                    templateUrl: "views/ourArtists/ourartist.list.html",
                    controller: "OurArtistController",
                    controllerAs: "model"
                })
                .when('/artistDetails/:artistId',{
                    templateUrl: "views/ourArtists/view.artist.html",
                    controller: "ArtistDetailsController",
                    controllerAs: "model"
                })
                .when('/songs/:artistId',{
                    templateUrl: "views/songs/view.songs.list.html",
                    controller: "SongsController",
                    controllerAs: "model"
                })
                .when('/artistRegisterRequest',{
                    templateUrl: "views/ArtistRegisterRequest/artist.register.html",
                    controller: "ArtistRegisterController",
                    controllerAs: "model"
                })
                .when('/mSocial',{
                    templateUrl: "sliderfiles/landing.html",
                  //  controller: "CarouselDemoCtrl",
                  //  controllerAs: "model"
                })
                .otherwise({
                    redirectTo:"/"
                });
            function checkLoggedIn(UserService,$q,$location){
                var deferred = $q.defer(); // create instance of deferred object which contains promise
                // to resolve we are explicity using angulars $q angulars promise. We can create and

                    console.log("artist");
                    UserService.getCurrentUser()
                        .then(function(response){
                            var currentUser= response.data;
                            if(currentUser){
                                UserService.setCurrentUser(currentUser);
                                console.log("user logged in");
                                deferred.resolve();//manage the promise bt resolving it
                            }else{
                                deferred.reject();//rejecting the promise
                                console.log("user not logged iin");
                                $location.url("/login");
                            }
                        });



                return deferred.promise;
            }

            function getLoggedIn(UserService,$q){
                var deferred = $q.defer(); // create instance of deferred object which contains promise
                // to resolve we are explicity using angulars $q angulars promise. We can create and

                UserService.getCurrentUser()
                    .then(function(response){
                        var currentUser= response.data;
                            console.log("user logged in");
                        console.log(currentUser);
                            UserService.setCurrentUser(currentUser);
                        deferred.resolve();//manage the promise bt resolving it
                        console.log("deferred object");
                        console.log(deferred);

                    });
                return deferred.promise;
            }

        });
})();


