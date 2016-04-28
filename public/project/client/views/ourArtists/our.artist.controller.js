(function(){
    angular.module('MSocialApp')
        .controller('OurArtistController',OurArtistController);


    function OurArtistController (OurArtistsService,UserService,$location){

        var vm = this;
        vm.artists=null;

        vm.follow = follow;
        vm.viewProfile = viewProfile;
        function init(){

            OurArtistsService.getAllArtists()
                .then(function(response){
                    console.log("all artists");
                    console.log(response);
                    vm.artists = response.data;
                },function(err){
                    console.log(err);
                })
        }

        init();

        function viewProfile(id){
            console.log(id);
            $location.path('/artistDetails/'+id+'');
        }

        function follow(artistId){
            UserService.getCurrentUser()
                .then(function(response){
                    console.log(response.data);
                    vm.user = response.data;
                },function(err){
                    console.log(err);
                })
                .then(function(){
                    OurArtistsService.follow(vm.user._id,artistId)
                        .then(function(response){
                            console.log(response);
                            vm.discussion = response.data;
                        });

                });
        }



    }
})();