(function(){
    angular.module('MSocialApp')
        .controller('AdminController',AdminController);

    function AdminController($scope,UserService){

            UserService.findAllUsers(function(users){
                $scope.users=users;
            } );

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

        $scope.updateUser = function () {

           // var uform = $scope.user_forms[$scope.selectedIndex];

            var n_user={
                _id:$scope.nuser._id,
                username:$scope.nuser.username,
                password:$scope.nuser.password,
                roles: $scope.nuser.roles
            };
            console.log("asfasf"+n_user.username);

            UserService.updateUser(n_user._id, n_user, function (user) {

                UserService.findAllUsers(function(users){
                    $scope.users=users;
                } );
            });

            $scope.nuser={};
        }

        $scope.selectUser = function(index){

            $scope.selectedIndex=index;

            $scope.nuser = {_id:$scope.users[index]._id,
                username:$scope.users[index].username,
                password:$scope.users[index].password,
                roles: $scope.users[index].roles};
        }

        $scope.deleteUser = function (index) {
            UserService.deleteUserById($scope.users[index]._id, function () {
                UserService.findAllUsers(function(users){
                    $scope.users=users;
                } );

            });

        }

    }
})();