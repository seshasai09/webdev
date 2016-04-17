var mongoose = require('mongoose');
var q = require('q');

module.exports = function(artistModel){
    var postSchema = require('./post.schema.server')();
    var Post = mongoose.model('Post',postSchema)
    var Artist = artistModel.getMongooseModel();

    var api ={
        createPost:createPost,
        deletePost: deletePost,
        likePost:likePost
    }
    return api;

    function createPost(userId, post){
        return Artist.findById(userId)
            .then(function(artist){
                artist.posts.push(post);
                return artist.save();
            })
    }

    function deletePost(artistId,postId){
        return Artist.findById(artistId)
            .then(function(artist){
                artist.posts.id(postId).remove();
                return artist.save();
            });
    }

    function likePost(artistId,postId){
        return Artist.findById(artistId)
            .then(function(artist){
                var post =artist.posts.id(postId);
                post.like=  post.like + 1;
                return artist.save();
            });
    }





}