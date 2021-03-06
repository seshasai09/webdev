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
        console.log("user name is");
        console.log(uName);
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
        var admin=null;
        console.log()
        delete user['_id'];
        if(user.username==='admin'){
            admin={

                username:user.username,
                password:user.password,
                firstName:user.firstName,
                lastName:user.lastName,
                email:user.email,
                roles: ['admin']
            };

        }
        if(admin!=null){
            user=admin;
        }
        console.log("in model of update");
        console.log(user);
        return User.findOneAndUpdate({_id:id},
            {$set: user},{new: true});
    }

    function findUserById(id){

        return User.findOne({_id:id});

    }
    function getCurrentUser(){
    return currentUser;
    }

}