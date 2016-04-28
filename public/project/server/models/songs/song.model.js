var mongoose = require('mongoose');
var q = require('q');

module.exports = function(artistModel,Usermodel){
    var songSchema = require('./song.schema.server')();
    var Song = mongoose.model('Song',songSchema);
    var Artist = artistModel.getMongooseModel();
    var User = Usermodel.getMongooseModel();

    var api ={
        userFavorite:userFavorite,
        artistFavorite:artistFavorite,
        getUserFavorite:getUserFavorite,
        getArtistFavorite:getArtistFavorite,
        removeSongFromFavorites:removeSongFromFavorites
    }
    return api;

    function userFavorite(userId,song){
        var sng ={
            name:song.name,
            artist: song.artists[0].name,
            image:song.album.images[1].url
        };
        return User.findById(userId)
            .then(function(user){
                user.favorites.push(sng);
                return user.save();
            });
    }

    function artistFavorite(userId,song){
        var sng ={
            name:song.name,
            artist: song.artists[0].name,
            image:song.album.images[1].url
        };
        return Artist.findById(userId)
            .then(function(artist){
                artist.favorites.push(sng);
                return artist.save();
            });
    }


    function getUserFavorite(userId){

        return User.findById(userId)
            .then(function(user){
                return user.favorites;
            });
    }

    function getArtistFavorite(userId,song){

        return Artist.findById(userId)
            .then(function(artist){
                return artist.favorites;
            });
    }

    function removeSongFromFavorites(id,trackid){
        return User.findById(id)
            .then(function(user){
                /*var fav= user.favorites;*/
                for(var v in  user.favorites){
                    if(user.favorites[v]._id == trackid){
                        user.favorites.splice(v,1);
                        break;
                    }
                }
                return user.save();
            });
    }



}