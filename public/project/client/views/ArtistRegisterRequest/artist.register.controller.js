(function(){
    angular.module('MSocialApp')
        .controller('ArtistRegisterController',ArtistRegisterController);

    function ArtistRegisterController($scope,UserService,ArtistService){

        var vm = this;
        vm.artistRequest = artistRequest;


    function artistRequest(){
        console.log(vm.artistName);
        ArtistService.artistRequest(vm.artistName)
            .then(function(response){
                vm.artistName="";
                vm.status="Your Request has been sent";
            });
    }


    }
})();