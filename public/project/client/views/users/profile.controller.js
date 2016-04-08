(function(){
    angular.module('MSocialApp')
        .controller('ProfileController',ProfileController);

    function ProfileController(UserService,$location ){
       // $scope.user=UserService.getCurrentUser();
       // console.log("in profile controller"+$rootScope.user);
        var vm = this;
       function init(){
           var currentUser = UserService.getCurrentUser();
          /* if(currentUser==null){
               $location.url("/login")
           }*/
       }
        return init();
        console.log($scope.nuser);
        $scope.update=function(){

            UserService.updateUser($scope.nuser._id,nuser,function(user){
                console.log("updating rootsoce after change"+user);
                $rootScope.user=user;
            });

        }


    }
})();