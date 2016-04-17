var mongoose = require('mongoose');
var q = require("q");
module.exports = function(db){

    var UserProjectSchema = require("./user.schema.server.js")();
    var User = mongoose.model('UserProject',UserProjectSchema);
    var mock= require("./user.mock.json"); // local instance to refrence the data
    var api= {
        findUserByCredentials: findUserByCredentials,
        createUser: createUser
    };

    return api;

    function findUserByCredentials(user){
        return User.findOne({username:user.username,password:user.password});
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
}