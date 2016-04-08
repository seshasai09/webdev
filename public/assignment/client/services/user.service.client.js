(function(){
    angular.module('FormBuilderApp')
        .factory('UserService',UserService);

    function UserService($http, $rootScope){
        var currentuser=null;
        var allUsers=null;
        var admin=false;

        return {
            findUserByCredentials: findUserByCredentials,
            logout:logout,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser,
            findUserByUsername: findUserByUsername,
            getCurrentUser: getCurrentUser,
            isAdmin: isAdmin,
            setCurrentUser:setCurrentUser,
            findUserByName:findUserByName,
            getLoggedInUser:getLoggedInUser

        }

        function isAdmin(){
            return admin;
        }
        function getLoggedInUser(){
            return $rootScope.currentUser;
        }
        function setLoggedInUser(user){
            $rootScope.currentUser=user;
        }

        function getCurrentUser(){
        //    return $rootScope.currentUser;
            return $http.get("/api/assignment/checkLoggedin");
        }

        function setCurrentUser(user){
            $rootScope.currentUser=user;
            if (user.roles.indexOf("admin")>-1){
                admin=true;
                $rootScope.admin=true
            }
            console.log($rootScope.currentUser);
        }

        function logout(){
            $rootScope.currentUser=null;
            $rootScope.admin=false;
            return $http.get("/api/assignment/logout");
        }

        function findUserByUsername(userName){
            return $http.get("/api/assignment/user?"+userName+"");
        }

        function findUserByCredentials(username, password){
            var user={username:username,
                password:password
            }
            console.log(user);
             return $http.post("/api/assignment/login",user)

        }
        function findAllUsers(){
            return $http.get("/api/assignment/user");
        }
        function createUser(user){
            console.log("creating the user");
            return $http.post("/api/assignment/user",user);
        }

        function deleteUserById(userId){
            console.log(userId);
            return $http.delete("/api/assignment/user/"+userId+"");
        }
        function updateUser(userId, user){
            return $http.put("/api/assignment/user/"+userId+"",user);
        }

        function findUserByName(name){
            return $http.get("/api/assignment/user/userName/"+name+"");
        }

    }
})();