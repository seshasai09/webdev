/**
 * Created by vasumathi on 06/03/2016.
 */
(function() {
    angular.module('FormBuilderApp')
        .controller('artistTracksController', artistTracksController);

    function artistTracksController($scope,$rootScope,$http,ArtistService) {

            console.log(ArtistService.getCurrentArtist());
            $http.get("http://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&artist=" +ArtistService.getCurrentArtist()+
                    "&api_key=1729cba71b947f46d5ec13e677950777&format=json")
                .then(function (response) {
                    // console.log(response.results.artistmatches.artist);
                    console.log(response.data.toptracks.track);
                    // alert(response.data.results.artistmatches.artist[0].image[0].t);
                    $scope.tracks = response.data.toptracks.track;
                });








    }
})();