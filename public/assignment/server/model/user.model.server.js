var mongoose = require('mongoose');
var q = require("q");
module.exports = function (db) {

    var UserSchema = require('./user.schema.server.js')();
    var User = mongoose.model('User',UserSchema);

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
       var deferred = q.defer();

        User.findOne({username: user.username,
                        password:user.password}, function(err,user){
            if(!err){
                deferred.resolve(user);
            }else{
                deferred.reject(err);
            }

        });
        return deferred.promise;
    }

    function findUserByUsername(uName){
       return User.findOne({username:uName});

    }
    function findAllUsers(){
        return User.find();

    }
    function createUser(user){
        var deferred = q.defer();

        User.create(user,function(err,user){
            if(!err){
                deferred.resolve(user);
            }else{
                deferred.reject(err);
            }
        })
        return deferred.promise;
    }
    function deleteUserById(id){
        return User.remove({_id:id});

    }
    function updateUserById(id,user){
        // console.log(require("./user.mock.json"));
        return User.findOneAndUpdate({_id:id},
            {$set: user});
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