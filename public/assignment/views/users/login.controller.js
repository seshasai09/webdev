(function(){
    angular.module('FormBuilderApp')
        .controller('logincontroller',logincontroller);
    function logincontroller($scope,UserService,$location, $rootScope){
        $scope.login= login;

        function  login(){
            console.log($scope.username,$scope.password);
            $scope.currentUser = UserService.findUserByCredentials($scope.username, $scope.password,
                function(user){
                if(user!=null){
                    $rootScope.user=user;
                    console.log(user.roles.indexOf("admin"));
                        if (user.roles.indexOf("admin")>-1){
                            $rootScope.admin=true;
                        }

                    console.log("i am rootscope object"+ $rootScope.user);
                        $location.path('/home');

                }
            });

        }
    }
})();

