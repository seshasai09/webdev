(function(){
    angular.module('MSocialApp')
        .controller('ArtistProfileController',ArtistProfileController);

    function ArtistProfileController(UserService,$location ){
       // $scope.user=UserService.getCurrentUser();
       // console.log("in profile controller"+$rootScope.user);
        var vm = this;
       function init(){
          // var currentUser = UserService.getCurrentUser();

           UserService.getCurrentUser()
               .then(function(response){
                   vm.nuser = response.data;
           },function(err){
                   console.log(err);
               });
           console.log(vm.nuser);
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