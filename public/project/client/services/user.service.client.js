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
            findUserByCredentials: findUserByCredentials,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser,
            getCurrentUser: getCurrentUser,
            setCurrentUser:setCurrentUser,
            logout: logout
        };
        return api;
        var currentuser=null;




        function getCurrentUser(){
            return $http.get("/api/project/isLoggedin");
        }

        function  setCurrentUser(user){
            $rootScope.currentUser=user;
            console.log($rootScope.currentUser);

        }

        function findUserByCredentials(user, callback){
            console.log("in user service"+user);
         //   console.log(users);
         ///   for(var u in users)
           /* {
                console.log(users[u]);
                if(users[u].username == user.username && users[u].password==user.password)
                {
                    console.log(users[u]);
                    currentuser=users[u];
                    callback(users[u]);
                }
            }*/
          //  return null;
            return $http.post("/api/project/login",user);

        }
        function findAllUsers(callback){
            console.log(users);
            callback(users);

        }
        function createUser(user){
            return http.post("/api/project/register",user);
            //users.push(user);
            //callback(users);
        }

        function deleteUserById(userId, callback){
            var index=-1;

            for(u in users){
                index++;
                if(users[u]._id==userId){
                    break;
                }
            }
            users.splice(index,1);;
        }

        function logout(){
            return $http.post("/api/project/logout");
        }
        function updateUser(userId, user,callback){
            console.log("user id update"+userId);
            console.log("user id update"+user.username);
            for(var u in users)
            {
                if(users[u]._id == userId )
                {
                    var index= users.indexOf(u);
                    users[u]=user;
                    console.log(users);
                    console.log(users[index]);
                    break;

                }
            }
            callback(user);
        }

    }
})();