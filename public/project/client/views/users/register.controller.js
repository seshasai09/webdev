(function(){
    angular.module('MSocialApp')
        .controller('RegisterController',RegisterController);

    function RegisterController($rootScope,UserService,$location ) {

        var vm = this;
        vm.register = register;

        function init() {

        }

        init();

        function regiter() {
            var user = {
                username: vm.user.username,
                password: vm.user.password,
                email: vm.user.email,
                roles: []
            };
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