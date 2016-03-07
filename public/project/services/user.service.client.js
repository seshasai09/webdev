(function(){
    angular.module('FormBuilderApp')
        .factory('UserService',UserService);

    function UserService(){
        var currentuser=null;
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

        return {
            findUserByCredentials: findUserByCredentials,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser,
            getCurrentUser: getCurrentUser
        }

        function getCurrentUser(){
            return currentuser;
        }

        function findUserByCredentials(username, password, callback){
            for(var u in users)
            {
                if(users[u].username == username && users[u].password==password)
                {
                    currentuser=users[u];
                    callback( users[u]);
                }
            }
            return null;

        }
        function findAllUsers(callback){
            console.log(users);
            callback(users);

        }
        function createUser(user,callback){
            users.push(user);
            callback(users);
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