(function(){
    angular.module('FormBuilderApp')
        .controller('logincontroller',logincontroller);
    function logincontroller($scope,UserService,$location, $rootScope){
        var vm = this;
        vm.login= login;

        function  login(){
            console.log(vm.user.username,vm.user.password);
            $scope.currentUser = UserService.findUserByCredentials(vm.user.username,vm.user.password)
                .then(function(response){
                    console.log("printing response data "+response.data)
                    if(response.data) {
                        UserService.setCurrentUser(response.data);
                        console.log(UserService.getCurrentUser());
                        $location.url('/home');
                    }

            });

        }
    }
})();

