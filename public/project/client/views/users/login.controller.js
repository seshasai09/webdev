(function(){
    angular.module('MSocialApp')
        .controller('logincontroller',logincontroller);
    function logincontroller(UserService,$location, $rootScope){
        var vm=this;
        vm.login= login;

        function  login(){
          //  console.log("using vm test "+vm.user.username,vm.user.password);
            console.log(vm.user.type);
            if(vm.user.type==null){
                alert("Select user typs");
                return;
            }
            $rootScope.type=vm.user.type;
            if(vm.user.type=="user"){
                UserService.userLogin({username: vm.user.username,password:vm.user.password})
                    .then(function(response){

                        console.log("printing response data "+response.data)
                        if(response.data) {
                            UserService.setCurrentUser(response.data);
                            $location.url('/home');
                        }
                    });
            }
            if(vm.user.type=="artist"){
                UserService.artistLogin({username: vm.user.username,password:vm.user.password})
                    .then(function(response){
                        console.log("printing response data "+response.data)
                        if(response.data) {
                            UserService.setCurrentUser(response.data);
                            $location.url('/home');
                        }
                    });
            }
            if(vm.user.type=="admin"){
                UserService.userLogin({username: vm.user.username,password:vm.user.password})
                    .then(function(response){
                        console.log("printing response data "+response.data)
                        if(response.data.type=="admin") {
                            UserService.setCurrentUser(response.data);
                            $location.url('/home');
                        }else{
                            $location.url('/login');
                        }
                    });
            }


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

