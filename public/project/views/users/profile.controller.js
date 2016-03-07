(function(){
    angular.module('FormBuilderApp')
        .controller('ProfileController',ProfileController);

    function ProfileController($rootScope,UserService,$scope,$location ){
       // $scope.user=UserService.getCurrentUser();
        console.log("in profile controller"+$rootScope.user);
        var nuser={
            "_id":$rootScope.user._id, "firstName":$rootScope.user.firstName,
            "lastName":$rootScope.user.lastName,
            "username":$rootScope.user.username,  "password":$rootScope.user.password,
            "roles": $rootScope.user.roles
        }
        $scope.nuser=nuser;
        console.log($scope.nuser);
        $scope.update=function(){

            UserService.updateUser($scope.nuser._id,nuser,function(user){
                console.log("updating rootsoce after change"+user);
                $rootScope.user=user;
            });

        }


    }
})();