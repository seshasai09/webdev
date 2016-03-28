(function() {
    angular.module('MSocialApp')
        .controller('getTracksController', getTracksController);

    function getTracksController($scope,$rootScope,$http,FavoriteService) {


            $http.get("http://ws.audioscrobbler.com/2.0/?method=chart.getTopTracks&api_key=1729cba71b947f46d5ec13e677950777&format=json")
                .then(function (response) {
                    console.log(response.data.tracks);

                    var fav =FavoriteService.getFavorites();
                    console.log(fav);
                    for(var v in fav) {
                        console.log("favorite"+ fav[v].url);
                        for (var u in response.data.tracks.track) {

                            if (response.data.tracks.track[u].url == fav[v].url) {
                                response.data.tracks.track[u].favorite=true;
                            }else{
                                if(response.data.tracks.track[u].favorite){
                                    continue;
                                }else {
                                    response.data.tracks.track[u].favorite = false;
                                }
                            }
                        }
                    }
                    $scope.tracks = response.data.tracks.track;
                });

        $scope.favorite=function(track){
            console.log("favorite="+track.url);
            FavoriteService.addTrackToFavorites(track);
        }



    }
})();