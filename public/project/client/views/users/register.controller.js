(function(){
    angular.module('MSocialApp')
        .controller('RegisterController',RegisterController);

    function RegisterController($rootScope,UserService,$location ) {

        var vm = this;
        vm.register = register;

        function init() {

        }

        init();

        function register() {
            var user = {
                username: vm.user.username,
                password: vm.user.password,
                email: vm.user.email
            };
            if(vm.user.vpassword!=vm.user.password){
                alert("password should be same");
                return;
            }
            UserService.createUser(user)
                .then(function (response) {
                    var currentUser = response.data;
                    if (currentUser != null) {
                        UserService.setCurrentUser(currentUser);
                        $location.url("/profile");
                    }
                });
        }
    }


})();