module.exports=function(app,Artistmodel) {
    app.post('/api/project/artist/post/:id', post);
    app.delete('/api/project/artist/:artistId/post/:postid',deletePost);
    app.get('/api/project/artist/:artistId/post/:postid',likePost);


    var model = require('../models/post/post.model.js')(Artistmodel);


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
        var postId = req.params['postid'];
        var artistId = req.params['artistId'];
        model.likePost(artistId,postId)
            .then(function(data){
                res.json(data.posts);
            },function(err){
                res.status(400);
            });
    }

}