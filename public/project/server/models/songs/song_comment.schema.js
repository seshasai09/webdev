var mongoose = require('mongoose');

moule.exports = function(){
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