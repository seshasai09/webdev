(function(){
    angular.module('MSocialApp')
        .factory('UserService',UserService);
    var users =[
        {    "_id":123, "firstName":"Alice",            "lastName":"Wonderland",
            "username":"alice",  "password":"alice",   "roles": ["student"]        },
        {    "_id":234, "firstName":"Bob",              "lastName":"Hope",
            "username":"bob",    "password":"bob",     "roles": ["admin"]        },
        {    "_id":345, "firstName":"Charlie",          "lastName":"Brown",
            "username":"charlie","password":"charlie", "roles": ["faculty"]        },
        {    "_id":456, "firstName":"Dan",              "lastName":"Craig",
            "username":"dan",    "password":"dan",     "roles": ["faculty", "admin"]},
        {    "_id":567, "firstName":"Edward",           "lastName":"Norton",
            "username":"ed",     "password":"ed",      "roles": ["student"]        }
    ];

    function UserService($http,$rootScope){
        var api={
            userLogin: userLogin,
            artistLogin:artistLogin,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser,
            getCurrentUser: getCurrentUser,
            setCurrentUser:setCurrentUser,
            logout: logout,
            post:post,
            getposts:getposts,
            getArtistposts:getArtistposts,
            getCurrentArtist:getCurrentArtist
        };
        return api;
        var currentuser=null;




        function getCurrentUser(){

                return $http.get("/api/project/isLoggedin");

        }

        function getCurrentArtist(){
            return $http.get('/api/project/artist/isLoggedin');
        }

        function  setCurrentUser(user){
            $rootScope.currentUser=user;

            console.log($rootScope.currentUser);

        }

        function userLogin(user, callback){
            console.log("in user service"+user);

           return $http.post("/api/project/login",user);
       //    return $http.post("/api/project/artist/login",user);

        }
        function artistLogin(user, callback){
            console.log("in artist service"+user);

            //   return $http.post("/api/project/login",user);
            return $http.post("/api/project/artist/login",user);

        }
        function findAllUsers(callback){
            return $http.get("/api/project/users/all");

        }
        function createUser(user){
            return $http.post("/api/project/register",user);
            //users.push(user);
            //callback(users);
        }


        function deleteUserById(userId){
            return $http.delete("/api/project/admin/user/"+userId+"");
            }


        function logout(){
            $rootScope.currentUser=null;
            $rootScope.admin=false;
            return $http.post("/api/project/logout");
        }
        function updateUser(userId, user){
                return $http.put("/api/project/user/"+userId+"",user);
        }


        function  post(userid,post){
            console.log(post);
            return $http.post('/api/project/artist/post/'+userid+'',post);
        }

        function getposts(userid){
            console.log("get posts for user");
            return $http.get('/api/project/user/post/'+userid+'');
        }

        function getArtistposts(userid){
            return $http.get('/api/project/artist/post/'+userid+'');
        }

    }
})();