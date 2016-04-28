var mongoose = require('mongoose');
var q = require('q');

module.exports = function(artistModel,Usermodel){
    var postSchema = require('./post.schema.server')();
    var Post = mongoose.model('Post',postSchema);
    var Artist = artistModel.getMongooseModel();
    var User = Usermodel.getMongooseModel();

    var api ={
        createPost:createPost,
        deletePost: deletePost,
        likePost:likePost,
        getPosts:getPosts,
        getArtistPosts:getArtistPosts
    }
    return api;

    function createPost(userId, post){
      var pos= {
          content: post.content,
          like: [],
          createddate:Date.now(),
          createdBy: userId,
          postcomment: []
      };
        return Artist.findById(userId)
            .then(function(artist){
                artist.posts.push(pos);
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

    function likePost(artistId,pst){
        console.log("asajs k haksjdas");
        console.log(pst);
        if(pst.type=="artist"){
            return Artist.findById(artistId)
                .then(function(artist){
                    var post =artist.posts.id(pst._id);

                    if(post.like.indexOf(artistId)>=0){
                       for(var v in post.like){
                           if(post.like[v]==artistId){
                               post.like.splice(v,1);
                               break;
                           }
                       }
                    }else{
                        post.like.push(artistId);
                        console.log("pushing the arrtist");
                    }
                    return artist.save();
                });
        }else{
            return Artist.findById(pst.createdBy)
                .then(function(artist){
                    var post =artist.posts.id(pst._id);
                    if(post.like.indexOf(artistId)>=0){
                        for(var v in post.like){
                            if(post.like[v]==artistId){
                                post.like.splice(v,1);
                                break;
                            }
                        }

                    }else{
                        console.log("pushing the user");
                        post.like.push(artistId);
                    }
                    return artist.save();
                });
        }

    }


    function getPosts(userId){

        return User.findById({_id:userId})
            .then(function(user){
                var follows = user.follows;
                console.log(follows);
                return Artist.find({_id:{ $in: follows }});
            },function(err){

            });
    }

    function getArtistPosts(userId){
        return Artist.findById({_id:userId})
            .then(function(artist){
                return artist.posts;
            },function(err){

            });
    }




}