var mongoose = require('mongoose');
module.exports = function(){
    var ArtistSchema = mongoose.Schema({
        name:String,
        spotifyId: String,
        username:String,
        password:String,
        email:String,
        firstname:String,
        lastname:String,
        likes:Number,
      //  comments:[CommentsSchema],
        posts:[PostSchema],
        songs:[SongSchema],
        discussion:[DiscussionSchema]
    },{collection:'artist'});

    return ArtistSchema;
}