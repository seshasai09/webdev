var mongoose = require('mongoose');
var q = require("q");
var http = require('http');
module.exports = function(db){

    var ArtistSchema = require("./artist.schema.server")();
    var ArtistRegisterSchema = require("./artist.register.schema")();
    var ArtistRegister = mongoose.model('ArtistRegister',ArtistRegisterSchema);
    var Artist = mongoose.model('Artist',ArtistSchema);
    var mock= require("./artists.mock.json"); // local instance to refrence the data
    var api= {
        findUserByCredentials: findUserByCredentials,
        createUser: createUser,
        post:post,
        getMongooseModel:getMongooseModel,
        addArtists:addArtists,
        getAllArtists:getAllArtists,
        getArtist:getArtist,
        getPosts:getPosts,
        artistRegister:artistRegister,
        getAllArtistRequests:getAllArtistRequests,
        deleteArtistFromRequest:deleteArtistFromRequest,
        getAllArtists:getAllArtists,
        deleteArtist:deleteArtist,
        updateArtistById:updateArtistById
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

    function addArtists(artist){
 //   var allArtists = new Array();
    console.log("in model of server");
        console.log(artist);

    //    for(var v in artists){
        var N_artist = new Artist({
            name:artist.name,
            spotifyId: artist.id,
            username:artist.id,
            password:"password",
            type:"artist",
            popularity: artist.popularity,
            followers: artist.followers.total,
            imageMURL:artist.images[2].url,
            imageSURL:artist.images[3].url,
            imageLURL:artist.images[1].url,
            likes:0,
            posts:[],
            songs:[],
            fans:[],
            discussion:[],
            profileViews:0
        });
        return Artist.findOne({spotifyId:artist.id})
            .then(function(user){
                if(user==null){
                     N_artist.save();
                }
            });


      /*  var deferred = q.defer();

        Artist.create(N_artist,function(err,user){
            if(!err){
                deferred.resolve(user);
            }else{
                deferred.reject(err);
            }
        })*/


    }
    function getAllArtists(){
        return Artist.find({});
    }

    function getArtist(id){
        return Artist.findOne({_id:id})
            .then(function(artist){
                console.log(artist);
                var view = artist.profileViews;
                console.log("views"+artist.profileViews);
                artist.profileViews= view + 1;
                return artist.save();
            });
    }

    function getPosts(id){
        console.log("finding artist");
         return Artist.findOne({_id:id});
    }


    function artistRegister(artistName){
        var artist = new ArtistRegister({username:artistName});
       return ArtistRegister.create(artist);
    }

    function getAllArtistRequests(){
        return ArtistRegister.find({});
    }

    function deleteArtistFromRequest(name){
        console.log("deleting from request"+name);
        return ArtistRegister.remove({username:name});
    }

    function getAllArtists(){
        return Artist.find({});
    }

    function deleteArtist(id){
        return Artist.remove({_id:id});
    }

    function updateArtistById(id,artst){
        return  Artist.findOne({_id:id})
            .then(function(artist){
                artist.username=artst.username;
                    artist.password=artst.password;
                    artist.firstname=artst.firstname;
                    artist.lastname=artst.lastname;
                    artist.email=artst.email;
                    artist.name = artst.name;
                return artist.save();
            });

    }

}