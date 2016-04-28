var mongoose = require('mongoose');
var q = require('q');

module.exports = function(artistModel){
    var discussionSchema = require('./discussion.schema.server')();
    var Discussion = mongoose.model('Discussion',discussionSchema);
    var Artist = artistModel.getMongooseModel();

    var api ={
        createDiscussion:createDiscussion,
        deleteDiscussion: deleteDiscussion,
        comment: comment,
        getDiscussion: getDiscussion,
        getAllDiscussions: getAllDiscussions,
        likeComment:likeComment
    }
    return api;

    function createDiscussion(userId, discussion){
        var dis = {
            name: discussion.name,
            description:discussion.description,
            discussion_comments:[],
            createddate : Date.now(),
            active:true,
            createdby:userId
        }
        return Artist.findById(userId)
            .then(function(artist){
                artist.discussion.push(dis);
                return artist.save();
            })
    }

    function getAllDiscussion(userId){
        return Artist.findById(userId)
            .then(function (user) {
                return user.discussion;
            },function(err){
                return err;
            });
    }

    function deleteDiscussion(artistId,discussionId){
        return Artist.findById(artistId)
            .then(function(artist){
                artist.discussion.id(discussionId).remove();
                return artist.save();
            });
    }

    function comment(artistId,discussionId,comment){
        console.log("comment");
        console.log(comment);
        return Artist.findById(artistId)
            .then(function(artist){
                var discussion =artist.discussion.id(discussionId);
                discussion.discussion_comments.push(comment);
                return artist.save();
            });
    }


    function getDiscussion(artistId,discussionId){
        return Artist.findById(artistId)
            .then(function(artist){
                var discussion =artist.discussion.id(discussionId);
               // discussion.push(comment);
                console.log(discussion);
                return discussion;
            });
    }

    function getAllDiscussions(){
        return Artist.find();
    }

    function likeComment(artistId,userId,discussionId,commentId){
        console.log("likig the coment");
        return Artist.findById(artistId)
            .then(function(artist){
                console.log(artist);
                var discussion =artist.discussion.id(discussionId);
                var lkes = discussion.discussion_comments.id(commentId).likes;
                console.log(lkes);
                if(discussion.discussion_comments.id(commentId).likes.indexOf(userId)>=0) {
                    console.log("usser removing the user");
                    for (var v in artist.discussion.id(discussionId).discussion_comments.id(commentId).likes) {
                        if (discussion.discussion_comments.id(commentId).likes[v] == userId) {
                            artist.discussion.id(discussionId).discussion_comments.id(commentId).likes.splice(v, 1);
                            break;
                        }
                    }
                  //  return artist.discussion.id(discussionId).discussion_comments.id(commentId).likes.save();
                }else{
                    console.log("adding the user")
                    artist.discussion.id(discussionId).discussion_comments.id(commentId).likes.push(userId);
                   // lkes.save();
                    console.log(artist.discussion.id(discussionId).discussion_comments.id(commentId).likes);
                    // artist.discussion.id(discussionId).discussion_comments.id(commentId).likes.save();
                }
              //  discussion.save();
                return artist.save();
            });
    }





}