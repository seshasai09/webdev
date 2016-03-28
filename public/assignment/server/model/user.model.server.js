var q = require("q");
module.exports = function () {

    var mock = require("./user.mock.json");
    var currentUser=null;

    var api={
        findUserByCredentials: findUserByCredentials,
        findUserByUsername: findUserByUsername,
        findAllUsers: findAllUsers,
        createUser: createUser,
        deleteUserById: deleteUserById,
        updateUserById: updateUserById,
        findUserById: findUserById,
        getCurrentUser: getCurrentUser
    };

    return api;

    function findUserByCredentials(user){
        console.log("in model of server "+user);
        // console.log(require("./user.mock.json"));
        for( var u in mock){
            if(mock[u].username===user.username && mock[u].password===user.password) {
                return mock[u];
            }
        }
        return null;

    }

    function findUserByUsername(uName){
        console.log("in model of find user by user name "+uName);
        // console.log(require("./user.mock.json"));
        for( var u in mock){
            if(mock[u].username===uName ) {
                console.log(mock[u]);
                return mock[u];
            }
        }
        return null;

    }
    function findAllUsers(){
        console.log("fetching all user");
        return mock;

    }
    function createUser(user){
        mock.push(user);
    }
    function deleteUserById(id){
        console.log("in model of server "+id);
        // console.log(require("./user.mock.json"));
        var index=0;
        for( var u in mock){
            if(parseInt(mock[u]._id)==parseInt(id)) {
                break;
            }
            index++;
        }
        console.log("index is "+index);
        mock.splice(index,1);
       console.log(mock);
        return null;

    }
    function updateUserById(id,user){
        console.log("in model of server "+user);
        // console.log(require("./user.mock.json"));
        var index=0;
        for( var u in mock){
            if(parseInt(mock[u]._id)==parseInt(id)) {
                break;
            }
            index++;
        }
        mock[index]=user;
        return mock;

    }
    function findUserById(id){
        console.log("in model of server "+id);
        // console.log(require("./user.mock.json"));
        for( var u in mock){
            console.log((mock[u]));
            if(parseInt(mock[u]._id)==parseInt(id)) {
                return mock[u];
            }
        }
        return null;

    }
    function getCurrentUser(){
    return currentUser;
    }

}