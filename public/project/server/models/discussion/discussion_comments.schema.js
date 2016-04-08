var mongoose = require('mongoose');

module.exports = function(){
    var Discussion_CommentsSchema = mongoose.Schema({
        content:String,
        createddate:{
            type:Date,
            default:Date.now()
        }
    },{collection:'discussion_comment'});

    return Discussion_CommentsSchema;
}