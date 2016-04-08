(function(){
    angular.module('FormBuilderApp')
        .controller('AdminController',AdminController);

    function AdminController(UserService){
        var vm = this;
       // vm.users=null;
        vm.findAllUsers=findAllUsers;
        vm.addUser=addUser;
        vm.deleteUser=deleteUser;
        vm.updateUser=updateUser;
        vm.selectUser=selectUser;
        init();

        function init(){
            findAllUsers();
        }
        function findAllUsers() {
            UserService.findAllUsers()
                .then(function (response) {
                    vm.nuser={};
                    vm.users = response.data;
                });
        }


         function addUser () {
            var nuser={
                username:vm.nuser.username,
                password:vm.nuser.password,
                roles: vm.nuser.roles.split("|")};
            UserService.createUser(nuser)
                .then( function(response) {
                    findAllUsers();
            });

            vm.nuser={};
        }

         function updateUser () {
                var u_user={
                _id:vm.nuser._id,
                username:vm.nuser.username,
                password:vm.nuser.password,
                roles: vm.nuser.roles
            };

            UserService.updateUser(u_user._id, u_user)
                .then(function(response){
                    vm.users = response.data;
                })

             vm.nuser={};
        }

        function selectUser(index){
       //     vm.selectedIndex=index;

            vm.nuser = {_id:vm.users[index]._id,
                username:vm.users[index].username,
                password:vm.users[index].password,
                roles: vm.users[index].roles};
        }

         function deleteUser(index) {
            UserService.deleteUserById(vm.users[index]._id)
                .then(function(){
                    findAllUsers();
                });
        }

    }
})();