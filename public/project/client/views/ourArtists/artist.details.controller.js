(function(){
    angular.module('MSocialApp')
        .controller('ArtistDetailsController',ArtistDetailsController);


    function ArtistDetailsController (OurArtistsService,$routeParams){

        var vm = this;


        //   vm.follow = follow;
     ///   vm.viewProfile = viewProfile;
        function init(){

            OurArtistsService.getArtist($routeParams.artistId)
                .then(function(response){
                    console.log("finally artist is here");
                    console.log(response);
                    console.log(response.data);
                    vm.artist = response.data;
                },function(err){
                    console.log(err);
                })
        }

        init();


    }
})();