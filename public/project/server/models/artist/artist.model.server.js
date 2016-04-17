var mongoose = require('mongoose');
var q = require("q");
module.exports = function(db){

    var ArtistSchema = require("./artist.schema.server")();
    var Artist = mongoose.model('Artist',ArtistSchema);
  //  var mock= require("./user.mock.json"); // local instance to refrence the data
    var api= {
        findUserByCredentials: findUserByCredentials,
        createUser: createUser,
        post:post,
        getMongooseModel:getMongooseModel
    };

    function getMongooseModel() {
        return Artist;
    }

    return api;

    function findUserByCredentials(user){
        return Artist.findOne({username:user.username,password:user.password});
    }

    function createUser(user){
        var deferred = q.defer();

        Artist.create(user,function(err,user){
            if(!err){
                deferred.resolve(user);
            }else{
                deferred.reject(err);
            }
        })
        return deferred.promise;
    }


    function post(userId, post){

    }
}