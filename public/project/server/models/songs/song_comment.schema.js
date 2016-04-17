var mongoose = require('mongoose');

module.exports = function(){
    var Song_CommentsSchema = mongoose.Schema({
        content:String,
        createddate:{
            type:Date,
            default:Date.now()
        },
        username:String
    },{collection:'song_comment'});

    return Song_CommentsSchema;
}