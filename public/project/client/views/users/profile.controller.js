(function(){
    angular.module('MSocialApp')
        .controller('ProfileController',ProfileController);

    function ProfileController(UserService,$location ){
       // $scope.user=UserService.getCurrentUser();
       // console.log("in profile controller"+$rootScope.user);


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
                firstName:vm.nuser.firstname,
                lastName:vm.nuser.lastname,
                email:vm.nuser.email,
                type:vm.nuser.type,
                discussions:vm.nuser.discussions,
                favorites:vm.nuser.favorites,
                follows:vm.nuser.follows,
                facebook:{}

            };
            console.log(u_user);
            /*if(vm.nuser.password!=null){
                u_user.password=vm.nuser.password;
            }*/
                    UserService.updateUser(u_user._id,u_user)
                        .then(function(response){
                            //  console.log("updating rootsoce after change"+user);
                            UserService.setCurrentUser(user);
                        });
        }


    }
})();