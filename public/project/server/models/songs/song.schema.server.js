var mongoose = require('mongoose')

module.exports = function(){
    var SongCommentsSchema = require('./song_comment.schema')();
    var SongSchema = mongoose.Schema({
       name:String,
        artist: String,
        image:String
    },{collection:'song'});

    return SongSchema;
}