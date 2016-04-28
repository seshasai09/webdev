(function(){
    angular.module('MSocialApp')
        .controller('ArtistProfileController',ArtistProfileController);

    function ArtistProfileController(UserService,ArtistService ){
       // $scope.user=UserService.getCurrentUser();
       // console.log("in profile controller"+$rootScope.user);
        var vm = this;


        var vm = this;
        vm.update = update;
        function init(){
            UserService.getCurrentUser()
                .then(function(response){
                    ///   console.log(response);
                    vm.nuser = response.data;
                });
            // console.log(currentUser);

            /* if(currentUser==null){
             $location.url("/login")
             }*/
        }
        init();
        function update(){
            //  console.log(vm.nuser);
            var user =null;

            var u_user={
                _id:vm.nuser._id,
                username:vm.nuser.username,
                password:vm.nuser.password,
                name:vm.nuser.name,
                firstname:vm.nuser.firstname,
                lastname:vm.nuser.lastname,
                email:vm.nuser.email
            };
            console.log(u_user);
            /*if(vm.nuser.password!=null){
             u_user.password=vm.nuser.password;
             }*/
            ArtistService.updateArtist(u_user._id,u_user)
                .then(function(response){
                    //  console.log("updating rootsoce after change"+user);
                    UserService.setCurrentUser(user);
                });
        }


    }
})();