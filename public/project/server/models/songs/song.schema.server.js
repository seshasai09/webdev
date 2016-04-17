var mongoose = require('mongoose')

module.exports = function(){
    var SongCommentsSchema = require('./song_comment.schema')();
    var SongSchema = mongoose.Schema({
       name:String,
        spotifyid: String,
        details:String,
        likes:Number,
        dislikes:Number,
        comments:[SongCommentsSchema],
        userId:String
    },{collection:'song'});

    return SongSchema;
}