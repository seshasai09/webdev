(function(){


    angular.module('MSocialApp')
        .controller('HeaderController',HeaderController);

    function HeaderController(UserService,$location){

        var vm =this; // this variable hold all the data that view will require
        vm.logout=logout;

        function logout(){
         //   UserService.setCurrentUser(null);
         //   console.log("logout"+ $rootScope.currentUser);
         //   $location.path('/home');
            UserService.logout()
                .then(function(){
                    UserService.logout()
                        .then(function(response){
                            $location.path('/login');
                        });

                });
        }

        function init(){
            console.log("afmksfalkfa"+$location.url());
            vm.$location=$location.url();
        }
        init();

    }
})();
