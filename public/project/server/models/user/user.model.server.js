var mongoose = require('mongoose');
var q = require("q");
module.exports = function(db,artistModel){

    var UserProjectSchema = require("./user.schema.server.js")();
    var User = mongoose.model('UserProject',UserProjectSchema);
    var mock= require("./user.mock.json"); // local instance to refrence the data
    var Artist = artistModel.getMongooseModel();
    var api= {
        findUserByCredentials: findUserByCredentials,
        createUser: createUser,
        follow:follow,
        findUserByFacebookId: findUserByFacebookId,
        getMongooseModel:getMongooseModel,
        createUserFromFacebook:createUserFromFacebook,
        findUserById:findUserById,
        getAllUsers:getAllUsers,
        deleteUserById:deleteUserById,
        updateUserById:updateUserById,
        findUserByUsername:findUserByUsername
    };

    return api;

    function getMongooseModel() {
        return User;
    }

    function findUserByCredentials(user){
        return User.findOne({username:user.username,password:user.password});
    }

    function findUserByFacebookId(facebookId) {
        console.log("fb id"+facebookId);
        return User.findOne({'facebook.id': facebookId});
    }

    function createUserFromFacebook(user){
        return User.create(user);
    }

    function createUser(user){
        var usr = {
            username: user.username,
            password: user.password,
            type:"user",
            firstname: "",
            lastname: "",
            email:user.email,
            follows:[],
            discussions:[],
            imageMURL:"http://www.realestatetaxgroup.com/wp-content/uploads/2013/03/empty-profile.png",
            favorites:[]
        };

        if(usr.username=='root'){
            usr.type='admin';
        }

        var deferred = q.defer();

        User.create(usr,function(err,nuser){
            if(!err){
                deferred.resolve(nuser);
            }else{
                deferred.reject(err);
            }
        })
        return deferred.promise;
    }

    function follow(userId,artistId){
        console.log("in model of follow");
       return  User.findOne({_id:userId})
            .then(function(user){
                var index =0;
                console.log(user);
                if( user.follows.indexOf(artistId)>=0){
                    for(var v in user.follows){
                        if(user.follows[v]===artistId){
                            user.follows.splice(v,1);
                            break;
                        }

                    }
                   return user.save()
                        .then(function(response){
                            Artist.findOne({_id:artistId})
                                .then(function(artist){
                                    if( artist.fans.indexOf(userId)>=0) {
                                        for (var v in artist.fans) {
                                            if (artist.fans[v] === userId) {
                                                artist.fans.splice(index, 1);
                                                break;
                                            }
                                            index++;
                                        }
                                        artist.save();
                                    }
                                });
                        });
                }else{
                    user.follows.push(artistId);
                    console.log(user.follows);
                   return  user.save()
                        .then(function(response){
                            return Artist.findOne({_id:artistId})
                                .then(function(artist){
                                    console.log("adding in artist fans");
                                    artist.fans.push(userId);
                                    console.log(artist);
                                    artist.save();
                                },function(err){
                                    console.log(err);
                                });
                        });
                }

            });
    }

    function findUserById(id){
        return User.findOne({_id:id});
    }

    function getAllUsers(){
        return User.find({type:'user'});
    }

    function deleteUserById(id){
        return User.remove({_id:id});
    }

    function updateUserById(id,usr){
        return  User.findOne({_id:id})
            .then(function(user){
                user.username=usr.username,
                    user.password=usr.password,
                    user.firstname=usr.firstName,
                    user.lastname=usr.lastName,
                    user.email=usr.email
                return user.save();
            });

    }

    function findUserByUsername(uName){
        return User.findOne({username:uName});

    }


}