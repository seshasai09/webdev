(function() {
    angular.module('MSocialApp')
        .controller('searchArtistController', searchArtistController);

    function searchArtistController($scope,$rootScope,$http,ArtistService,$location) {

        var vm = this;
        vm.search=search;
        vm.getTracks=getTracks;

        function search() {
            console.log(vm.artist.name);
            ArtistService.search(vm.artist.name)
                 .then(function (response) {
                     console.log(response.data);
                  //   vm.artists = response.data.results.artistmatches.artist;
                     vm.artists = response.data.artists.items;
                 });

        }
        function getTracks(artistName){
            ArtistService.setCurrentArtist(artistName);
            $location.path('/getTracksofArtist');

        }





    }
})();