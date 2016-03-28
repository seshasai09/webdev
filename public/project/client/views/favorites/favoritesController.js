(function(){
    angular.module('MSocialApp')
        .controller('favoritesController',favoritesController);

    function favoritesController($scope,FavoriteService){
         $scope.favorites =FavoriteService.getFavorites();
        console.log( $scope.favorites);

        $scope.update=update;
        $scope.delete=deleteFav;

        function update(track,review){
            console.log(track);
            console.log("review"+review);
            FavoriteService.addReview(track,review);
        }

        function deleteFav(track){

            FavoriteService.deleteTrackfromFavorites(track);
        }
    }
})();