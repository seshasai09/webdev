/**
 * Created by vasumathi on 25/02/2016.
 */
(function(){
    angular.module('MSocialApp')
        .controller('SongsController',SongsController);

    function SongsController(UserService,SongService,$routeParams){
        var vm = this;
        vm.favorite = favorite;
        vm.likeSong = likeSong;

        //console.log(UserService.getCurrentUser());
        //$scope.user=UserService.getCurrentUser().firstName;

        init();

        function init(){
            SongService.getAllSongs($routeParams.artistId)
                .then(function(response){
                   console.log(response.data);
                    vm.tracks = response.data.tracks;
                });

        }

        function favorite(index){
            console.log("index is ");
            console.log(index);
            console.log(vm.tracks[index]);
            UserService.getCurrentUser()
                .then(function(response){
                    SongService.userfavorite(response.data._id,vm.tracks[index]).
                    then(function(response){
                        console.log("added to favorites");
                    });
                },function(err){
                    console.log(err);
                });


        }
        function likeSong(){

        }




    }

})();
