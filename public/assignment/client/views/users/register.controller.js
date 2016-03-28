(function(){
    angular.module('FormBuilderApp')
        .controller('RegisterController',RegisterController);

    function RegisterController(UserService,$location ){

        var vm = this;
        vm.register=register;

        function register(){
            var user={username:vm.user.username,
                password: vm.user.password,
                email: vm.user.email,
                roles:[]};
            UserService.createUser(user)
                .then(function(response){
                UserService.setCurrentUser(user);
                    console.log("getting current user");
                    console.log(UserService.getCurrentUser());
                $location.path('/profile');
            });

        }


    }
})();