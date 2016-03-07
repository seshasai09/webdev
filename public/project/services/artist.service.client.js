(function(){
    angular.module('FormBuilderApp')
        .factory('ArtistService',ArtistService);

    function ArtistService(){
        var currentArtist=null;


        return {
            findTracksByArtist: findTracksByArtist,
            findAllArtists: findAllArtists,
            artistDetails: artistDetails,
            tweetsAboutArtist: tweetsAboutArtist,
            getCurrentArtist: getCurrentArtist,
            setCurrentArtist:setCurrentArtist
        }

        function getCurrentArtist(){
            return currentArtist;
        }

        function setCurrentArtist(name){}

        function findTracksByArtist(name, callback){
            for(var u in users)
            {
                if(users[u].username == username && users[u].password==password)
                {
                    currentuser=users[u];
                    callback( users[u]);
                }
            }
            return null;

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