(function(){
    angular.module('FormBuilderApp')
        .factory('FavoriteService',FavoriteService);

    function FavoriteService(){
        var userFavoriteList=[];


        return {
            addTrackToFavorites: addTrackToFavorites,
            deleteTrackfromFavorites: deleteTrackfromFavorites,
            getFavorites: getFavorites

        }

        function getFavorites(){
            console.log(userFavoriteList);
            return userFavoriteList;
        }

        function addTrackToFavorites(track){
            //if(userFavoriteList==null){
            //    userFavoriteList= new Array();
            //}
            userFavoriteList.push(track);
            console.log(userFavoriteList);
        }

        function deleteTrackfromFavorites(track, callback){

            var index=-1;
            for(var u in userFavoriteList)
            {
                index++;
                if(users[u].username == username )
                {
                   break;
                }
            }
            userFavoriteList.splice(index,1)

        }
        //function findAllArtists(callback){
        //    console.log(users);
        //    callback(users);
        //
        //}
        //function artistDetails(user,callback){
        //    users.push(user);
        //    callback(users);
        //}
        //
        //function tweetsAboutArtist(userId, callback){
        //    var index=-1;
        //
        //    for(u in users){
        //        index++;
        //        if(users[u]._id==userId){
        //            break;
        //        }
        //    }
        //    users.splice(index,1);
        //}


    }
})();