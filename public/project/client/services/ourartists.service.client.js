(function(){
    angular.module('MSocialApp')
        .factory('OurArtistsService',OurArtistsService);

    function OurArtistsService($http){
        var api ={
            getAllArtists : getAllArtists,

            getArtist:getArtist,
           follow : follow
          //  viewProfile : viewProfile,
        };

        return api;

        function getArtist(artistId){
            return $http.get('/api/project/ourArtists/artist/'+artistId);
        }

        function getAllArtists(){
            return $http.get("/api/project/ourArtists");

        }

        function follow(userId,artistId){
            return $http.get("/api/project/user/"+userId+"/follow/"+artistId+"",userId);
        }


    }
})();