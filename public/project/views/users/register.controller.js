(function(){
    angular.module('FormBuilderApp')
        .controller('RegisterController',RegisterController);

    function RegisterController($rootScope,UserService,$scope,$location ){

        $scope.register=function(){
            var user={username:$scope.username,
                password: $scope.password,
                email: $scope.email,
                roles:[]};
            UserService.createUser(user,function(user){
                console.log(user);
                $rootScope.user=user;
                $location.path('/profile');
            });

        }


    }
})();