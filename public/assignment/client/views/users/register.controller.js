(function(){
    angular.module('FormBuilderApp')
        .controller('RegisterController',RegisterController);

    function RegisterController(UserService,$location ){

        var vm = this;
        vm.register=register;

        function register(){
            var user={username:vm.user.username,
                password: vm.user.password,
                email: vm.user.email.split(','),
                roles:[]};
            UserService.register(user)
                .then(function(response){
                UserService.setCurrentUser(user);
                $location.path('/profile');
            });

        }


    }
})();