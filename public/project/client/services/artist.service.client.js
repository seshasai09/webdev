(function(){
    angular.module('MSocialApp')
        .factory('ArtistService',ArtistService);

    function ArtistService($http){
        var currentArtist=null;


        var api= {
            findTracksByArtist: findTracksByArtist,
            findAllArtists: findAllArtists,
            artistDetails: artistDetails,
            tweetsAboutArtist: tweetsAboutArtist,
            getCurrentArtist: getCurrentArtist,
            setCurrentArtist:setCurrentArtist,
            search: search,
            addArtist : addArtist,
            getAllArtists : getAllArtists,
            getPosts: getPosts,
            artistRequest:artistRequest,
            getArtistRequest:getArtistRequest,
            artistRequestDelete:artistRequestDelete,
            findAllArtists:findAllArtists,
            deleteArtistById:deleteArtistById,
            updateArtist:updateArtist
        };
        return api;
        function init(){

        }
        init();

        function search(name){
          /* return  $http.get("http://ws.audioscrobbler.com/2.0/?method=artist.search&artist=" +name+
                    "&api_key=1729cba71b947f46d5ec13e677950777&format=json");*/

       //     https://api.spotify.com/v1/search?q=tania%20bowra&type=artist
            return $http.get("https://api.spotify.com/v1/search?q="+name+"&limit=1&type=artist");

        }

        function getCurrentArtist(){
            return currentArtist;
        }

        function setCurrentArtist(name){}

        function findTracksByArtist(){

            return $http.get("http://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&artist=" +getCurrentArtist()+
                "&api_key=1729cba71b947f46d5ec13e677950777&format=json");

        }
        function findAllArtists(callback){
            return $http.get("");

        }

        function addArtist(artist){
            console.log("callign server to add artists");
            console.log(artist);
            return $http.post("/api/project/artist/addArtists",artist);

        }

        function getAllArtists(){
            return $http.get("/api/project/artist/getArtistsList");
        }
        function artistDetails(user,callback){
            users.push(user);
            callback(users);
        }

        function tweetsAboutArtist(userId, callback){
            var index=-1;

            for(u in users){
                index++;
                if(users[u]._id==userId){
                    break;
                }
            }
            users.splice(index,1);;
        }

        function getPosts(id){
            return $http.get('/api/project/artist/'+id+'/getPosts');
        }

        function artistRequest(artistName){
            return $http.get('/api/project/artist/register/'+artistName);
        }

        function getArtistRequest(){
            return $http.get('/api/project/artist/all/');
        }

        function artistRequestDelete(artistName){
            return $http.get('/api/project/artistRequest/delete/'+artistName);
        }

        function findAllArtists(){
            return $http.get("/api/project/artists");
        }

        function deleteArtistById(id){
            return $http.delete("/api/project/admin/artist/"+id+"");
        }

        function updateArtist(id, artist){
            return $http.put("/api/project/artist/"+id+"",artist);
        }


    }
})();