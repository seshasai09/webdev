var mongoose = require('mongoose');
module.exports = function(){
    var PostSchema = require('../post/post.schema.server.js')();
    var SongSchema = require('../songs/song.schema.server.js')();
    var DiscussionSchema = require('../discussion/discussion.schema.server.js')();
    var SongSchema = require('../songs/song.schema.server')();
    var ArtistSchema = mongoose.Schema({
        name:String,
        type:String,
        spotifyId: String,
        username:String,
        password:String,
        email:String,
        firstname:String,
        lastname:String,
        likes:Number,
        popularity: Number,
        followers: Number,
        imageMURL:String,
        imageSURL:String,
        imageLURL:String,
      //  comments:[CommentsSchema],
        posts:[PostSchema],
        follows:[String],
        fans:[String],
        favorites:[SongSchema],
        discussion:[DiscussionSchema],
        profileViews: Number

    },{collection:'artist'});

    return ArtistSchema;
}