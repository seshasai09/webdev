var mongoose = require('mongoose');

module.exports = function(){

    var ArtistSchema = require('../artist/artist.schema.server.js')();
    var DiscussionSchema = require('../discussion/discussion.schema.server')();
    var SongSchema = require('../songs/song.schema.server')();
    var UserProjectSchema= mongoose.Schema({
        username: String,
        password: String,
        type:String,
        firstname: String,
        lastname: String,
        email:String,
        facebook:   {
            id:    String,
            token: String
        },
        follows:[String],
        discussions:[String],
        imageMURL:String,
        favorites:[SongSchema]

    },{collection:'userProject'});
return UserProjectSchema;
};