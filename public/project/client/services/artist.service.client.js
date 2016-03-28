(function(){
    angular.module('MSocialApp')
        .factory('ArtistService',ArtistService);

    function ArtistService(){
        var currentArtist=null;


        var api= {
            findTracksByArtist: findTracksByArtist,
            findAllArtists: findAllArtists,
            artistDetails: artistDetails,
            tweetsAboutArtist: tweetsAboutArtist,
            getCurrentArtist: getCurrentArtist,
            setCurrentArtist:setCurrentArtist,
            search: search
        };
        return api;
        function init(){

        }
        init();

        function search(name){
           return  $http.get("http://ws.audioscrobbler.com/2.0/?method=artist.search&artist=" +name+
                    "&api_key=1729cba71b947f46d5ec13e677950777&format=json");

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
            console.log(users);
            callback(users);

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


    }
})();