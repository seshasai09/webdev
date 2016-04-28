(function(){
    angular.module('MSocialApp')
        .controller('AdminAllFunctionsController',AdminAllFunctionsController);

    function AdminAllFunctionsController($scope,UserService,ArtistService){

        var vm = this;
        vm.addAllArtists = addAllArtists;
        vm.viewAllArtists = viewAllArtists;
        vm.viewAllUsers = viewAllUsers;
        vm.artistRequestDelete=artistRequestDelete;
        vm.userDelete=userDelete;
        vm.artistDelete = artistDelete;


        init();

        function init(){
            //      console.log(vm.artistName);
            ArtistService.getArtistRequest()
                .then(function(response){
                    console.log(response);
                    vm.artists = response.data;
                //    vm.="Your Request has been sent";
                });
        }


        function viewAllUsers() {
            console.log("all users");
            UserService.findAllUsers()
                .then(function(response){
                    console.log(response);
                    vm.artists = response.data;
                })
        }

        function userDelete(user){
            console.log(user._id);
            UserService.deleteUserById(user._id)
                .then(function(response){
                    console.log(response);
                    vm.artists = response.data;
                });
        }

        function artistDelete(artist){
            ArtistService.deleteArtistById(artist._id)
                .then(function(response){
                    console.log(response);
                    vm.artists = response.data;
                });
        }


            function viewAllArtists() {
                ArtistService.findAllArtists()
                    .then(function(response){
                        console.log(response);
                        vm.artists = response.data;
                    })


            }

        function addAllArtists(){
            console.log("call function to add all artists");
            var allArtists = new Array();
            ArtistService.search(vm.name)
                .then(function(response){
                    console.log(response.data.artists.items[0]);
                    ArtistService.addArtist(response.data.artists.items[0])
                        .then(function(response){
                            vm.status="User successfully added";
                            console.log(vm.status);
                            vm.name="";
                        });
                });






           /* ArtistService.addAllArtists()
                .then(function(response){
                    console.log(response);
                });*/
        }

        //$scope.addUser = addUser;
        //$scope.updateUser = updateUser;
        //$scope.selectUser = selectUser;
        //$scope.deleteUser = deleteUser;

        $scope.addUser = function () {
            var nuser={
                _id:(new Date).getTime(),
                username:$scope.nuser.username,
                password:$scope.nuser.password,
                roles: $scope.nuser.roles.split("|")};
            UserService.createUser(nuser, function (users) {
                $scope.users=users;
            });

            $scope.nuser={};
        }





        $scope.deleteUser = function (index) {
            UserService.deleteUserById($scope.users[index]._id, function () {
                UserService.findAllUsers(function(users){
                    $scope.users=users;
                } );

            });

        }

        function artistRequestDelete(name){
            ArtistService.artistRequestDelete(name)
                .then(function(response){
                    console.log(response);
                    vm.artists = response.data;
                    //    vm.="Your Request has been sent";
                });
        }

    }
})();