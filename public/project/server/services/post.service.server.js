module.exports=function(app,Artistmodel,Usermodel) {
    app.post('/api/project/artist/post/:id', post);
    app.delete('/api/project/artist/:artistId/post/:postid',deletePost);
    app.put('/api/project/artist/:artistId/post',likePost);
    app.get('/api/project/user/post/:userId',getPosts);
    app.get('/api/project/artist/post/:userId',getArtistPosts);


    var model = require('../models/post/post.model.js')(Artistmodel,Usermodel);


    function post(req,res){
        var post =req.body;
        var id = req.params['id'];
        console.log(model);
        model.createPost(id,post)
            .then(function(data){
                console.log(data);
                res.json(data.posts);
            },function(err){
                res.status(400);
            })
    }

    function deletePost(req,res){
        var postId = req.params['postid'];
        var artistId = req.params['artistId'];
        model.deletePost(artistId,postId)
            .then(function(data){
                res.json(data.posts);
            },function(err){
                res.status(400);
            });
    }

    function likePost(req,res){
        var post = req.body;
        var artistId = req.params['artistId'];
        model.likePost(artistId,post)
            .then(function(data){
                res.json(data.posts);
            },function(err){
                res.status(400);
            });
    }

    function getPosts(req,res){
        console.log("fetching posts");
        var posts = new Array();
        var userId = req.params['userId'];
        console.log("fetching all posts");
        console.log(userId);
        model.getPosts(userId).
            then(function(response){;
            for(var v in response){
                console.log("printing posts");
               // console.log(response);
                console.log(response[v].posts);
                posts.push({artistId:response[v]._id,image:response[v].imageSURL,
                posts:response[v].posts});
                /*for(var u in response[v].posts){
                    posts.push(response.posts[u]);
                }*/
            }
            console.log(posts);
            res.json(posts);
        })
    }

    function getArtistPosts(req,res){
     ///   var posts = new Array();
        console.log("artist posts");
        var userId = req.params['userId'];
        model.getArtistPosts(userId).
        then(function(response){
            for(var v in posts)
            console.log(posts);
            res.json(response);
        },function(err){
            res.status(400);
        })
    }

}