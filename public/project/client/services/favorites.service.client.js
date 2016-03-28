(function(){
    angular.module('MSocialApp')
        .factory('FavoriteService',FavoriteService);

    function FavoriteService(){
        var userFavoriteList=[];


        return {
            addTrackToFavorites: addTrackToFavorites,
            deleteTrackfromFavorites: deleteTrackfromFavorites,
            getFavorites: getFavorites,
            addReview: addReview

        }

        function addReview(track,review){
            console.log(track.url)
            for(f in userFavoriteList){
                if(userFavoriteList[f].url==track.url){
                    userFavoriteList[f].review =review;
                    console.log(userFavoriteList[f].review);
                    break;
                }
            }
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

        function deleteTrackfromFavorites(track){

            var index=-1;
            for(var u in userFavoriteList)
            {
                index++;
                if(userFavoriteList[u].url == track.url)
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