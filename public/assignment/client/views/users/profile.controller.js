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
            UserService.findUserByName(vm.nuser.username)
                .then(function (response) {
                    console.log(response);
                   user=response.data;
                });
            console.log(user);
            if(user.roles==undefined){
                user.roles=[];
            }
            UserService.updateUser(user._id,vm.nuser)
                .then(function(response){
              //  console.log("updating rootsoce after change"+user);
                UserService.setCurrentUser(user);
            });

        }


    }
})();