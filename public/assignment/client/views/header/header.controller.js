(function(){


    angular.module('FormBuilderApp')
        .controller('HeaderController',HeaderController);

    function HeaderController(UserService,$location){
        var vm = this;
        vm.logout=logout;

        function logout(){
            UserService.logout()
                .then(function(){
                $location.path('/home');
            });

        }
    }
})();
