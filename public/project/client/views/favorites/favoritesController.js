(function(){
    angular.module('MSocialApp')
        .controller('favoritesController',favoritesController);

    function favoritesController(UserService,SongService){


            var vm = this;

        vm.remove=remove;
        init();
        function init(){
            UserService.getCurrentUser()
                .then(function(response){
                    SongService.getuserFavorit(response.data._id).
                    then(function(response){
                        /*console.log("favorites");
                        console.log(response);*/
                        vm.tracks = response.data;
                    });
                },function(err){
                    console.log(err);
                });

        }


        function remove(trackId){

            UserService.getCurrentUser()
                .then(function(response){
                    SongService.removeSongFromFavorite(response.data._id,trackId).
                    then(function(response){
                        console.log("favorites");
                         console.log(response);
                        vm.tracks = response.data;
                    });
                },function(err){
                    console.log(err);
                });
        }






    }
})();