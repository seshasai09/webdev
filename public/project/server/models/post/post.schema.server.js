var mongoose = require('mongoose');

module.exports = function(){
    var PostCommentSchema = require('./post_comment.schema.js')();
    var PostSchema = mongoose.Schema({
        content: String,
        createddate :{
            type: Date,
            default: Date.now()
        },
        like:{
            type: Number,
            default: 0
        },
        postcomment :[PostCommentSchema]

    },{collection:'post'});
    return PostSchema;
}