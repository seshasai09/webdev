(function() {
    angular.module('FormBuilderApp')
        .controller('searchArtistController', searchArtistController);

    function searchArtistController($scope,$rootScope,$http,ArtistService,$location) {

        $scope.search=function() {
            console.log($scope.artist);
            $http.get("http://ws.audioscrobbler.com/2.0/?method=artist.search&artist=" +$scope.artist+
                    "&api_key=1729cba71b947f46d5ec13e677950777&format=json")
                .then(function (response) {
                   // console.log(response.results.artistmatches.artist);
                    console.log(response.data.results);
                   // alert(response.data.results.artistmatches.artist[0].image[0].t);
                    $scope.artists = response.data.results.artistmatches.artist;
                });

        }
        $scope.getTracks=function(artistName){
            ArtistService.setCurrentArtist(artistName);
            console.log(ArtistService.getCurrentArtist());
            $location.path('/getTracksofArtist');

        }





    }
})();