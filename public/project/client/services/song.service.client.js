(function(){
    angular.module('MSocialApp')
        .factory('SongService',SongService);

    function SongService($http){
        var api ={
            getAllSongs:getAllSongs,
            userfavorite : userfavorite,
            artistfavorite:artistfavorite,
            likeSong:likeSong,
            getuserFavorit:getuserFavorit,
            artistFavorit:artistFavorit,
            removeSongFromFavorite:removeSongFromFavorite

        };

        return api;

        function getAllSongs(id){
            /* return  $http.get("http://ws.audioscrobbler.com/2.0/?method=artist.search&artist=" +name+
             "&api_key=1729cba71b947f46d5ec13e677950777&format=json");*/

           // https://api.spotify.com/v1/search?q=tania%20bowra&type=artist

                return $http.get(" https://api.spotify.com/v1/artists/"+id+"/top-tracks?country=US");

        }

        function userfavorite(userId,track){
            return $http.post("/api/project/user/"+userId+"/song/favorite",track);

        }
        function artistfavorite(userId,track){
            return $http.post("/api/project/user/"+userId+"/song/favorite",track);

        }

        function likeSong(artistId,postId){
            return $http.get("/api/project/artist/"+artistId+"/post/"+postId+"");

        }

        function getuserFavorit(userId){
           // /api/project/user/:userId/song/favorite
            return $http.get("/api/project/user/"+userId+"/song/favorite");
        }

        function artistFavorit(artistId){
            // /api/project/user/:userId/song/favorite
            return $http.get("/api/project/artist/"+artistId+"/song/favorite");
        }

        function removeSongFromFavorite(id,trackid){
            return $http.delete("/api/project/user/"+id+"/song/favorite/"+trackid);
        }

       /* app.get('/api/project/user/:userId/song/favorite', getUserFavorite);
        app.get('/api/project/artist/:artistId/song/favorite', getArtistFavorite);*/
    }
})();