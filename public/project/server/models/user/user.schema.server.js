var mongoose = require('mongoose');

module.exports = function(){

    var ArtistSchema = require('../artist/artist.schema.server.js')();
    var DiscussionSchema = require('../discussion/discussion.schema.server')();
    var UserProjectSchema= mongoose.Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        email:String,
        phone:String,
        follows:[ArtistSchema],
        discussions:[DiscussionSchema]

    },{collection:'userProject'});
return UserProjectSchema;
};