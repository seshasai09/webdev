var mongoose = require('mongoose');

module.exports = function(){
    var PostCommentSchema = mongoose.Schema({
        content:String,
        createddate:{
            type:Date,
            default:Date.now()
        },
        username:String
    },{collection:'post_comment'});

    return PostCommentSchema;
}