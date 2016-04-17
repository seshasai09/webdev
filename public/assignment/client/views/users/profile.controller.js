(function(){
    angular.module('FormBuilderApp')
        .controller('ProfileController',ProfileController);

    function ProfileController($rootScope,UserService,$scope,$location ){

        var vm = this;
       // $scope.user=UserService.getCurrentUser();
        vm.update=update;
        init();
        function init(){
            UserService.getCurrentUser()
                .then(function(response){
                    var user =response.data;
                    delete user['password'];
                    vm.nuser = user;
                   // delete vm.nuser['password'];
                });
            console.log(vm.nuser);
        }

        function update(){
            console.log(vm.nuser.username);
            var user =null;
            var u_user={
                _id:vm.nuser._id,
                username:vm.nuser.username,
                //   password:vm.nuser.password,
                firstName:vm.nuser.firstName,
                lastName:vm.nuser.lastName,
                email:vm.nuser.email

            };
            if(vm.nuser.password!=null){
                u_user.password=vm.nuser.password;
            }

            console.log(u_user);

            UserService.findUserByName(vm.nuser.username)
                .then(function(response){
                   // console.log("response data iis")
                   // console.log(response);
                   user=response.data;
                    UserService.updateUser(u_user._id,u_user)
                        .then(function(response){
                            //  console.log("updating rootsoce after change"+user);
                            UserService.setCurrentUser(user);
                        });
                });



        }


    }
})();