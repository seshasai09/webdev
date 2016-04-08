var mongooose = require('mongoose');

module.exports = function(){
    var PostSchema = mongoose.Schema({
        content: String,
        createddate :{
            type: Date,
            default: Date.now()
        },
        like:Number,
        postcomment :[PostCommentSchema]

    },{collection:'post'});
}