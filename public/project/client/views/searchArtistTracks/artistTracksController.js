/**
 * Created by vasumathi on 06/03/2016.
 */
(function() {
    angular.module('MSocialApp')
        .controller('artistTracksController', artistTracksController);

    function artistTracksController($scope,$rootScope,$http,ArtistService) {

        var vm = this;
        function init(){

            console.log(ArtistService.getCurrentArtist());
            ArtistService.findTracksByArtist()
                            .then(function (response) {
                    vm.tracks = response.data.toptracks.track;
                });

        }
        init();


    }
})();