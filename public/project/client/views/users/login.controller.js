(function(){
    angular.module('MSocialApp')
        .controller('logincontroller',logincontroller);
    function logincontroller(UserService,$location, $rootScope){
        var vm=this;
        vm.login= login;

        function  login(){
            console.log("using vm test "+vm.user.username,vm.user.password);
            UserService.findUserByCredentials({username: vm.user.username,password:vm.user.password})
                .then(function(response){
                    console.log("printing response data "+response.data)
                    if(response.data) {
                        UserService.setCurrentUser(response.data);
                        $location.url('/home');
                    }
                });

                /*function(user){
                    console.log(user);
                if(user!=null){
                    $rootScope.user=user;
                    console.log(user.roles.indexOf("admin"));
                        if (user.roles.indexOf("admin")>-1){
                            $rootScope.admin=true;
                        }

                    console.log("i am rootscope object"+ $rootScope.user);
                        $location.path('/home');

                }
            }*/

        }
    }
})();

