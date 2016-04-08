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
                    vm.nuser = response.data;
                });
            console.log(vm.nuser);
        }

        function update(){
            console.log(vm.nuser.username);
            var user =null;
            console.log("hello");
            console.log( UserService.findUserByName(vm.nuser.username));

            UserService.findUserByName(vm.nuser.username)
                .then(function(response){
                   // console.log("response data iis")
                   // console.log(response);
                   user=response.data;
                    UserService.updateUser(user._id,vm.nuser)
                        .then(function(response){
                            //  console.log("updating rootsoce after change"+user);
                            UserService.setCurrentUser(user);
                        });
                });



        }


    }
})();