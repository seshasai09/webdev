module.exports=function(app,Artistmodel) {
    app.post('/api/project/artist/discussion/:id', createDiscussion);
    app.delete('/api/project/artist/:artistId/discussion/:discussionid',deleteDiscussion);
    app.get('/api/project/artist/:artistId/discussion/:discussionid',getDiscussion);
    app.post('/api/project/artist/:artistId/discussion/:discussionid',comment);
    app.get("/api/project/artist/discussion",getAllDiscussions);
   // app.get('/api/project/artist/:artistId/discussion/:discussionid',deleteDiscussion);
    app.get("/api/project/artist/:artistId/discussion/:discussionId/user/:userId/commentlike/:commentId",likeComment);



    var model = require('../models/discussion/discussion.model.server.js')(Artistmodel);


    function createDiscussion(req,res){
        var discussion =req.body;
        var id = req.params['id'];
        console.log(discussion);
      ///  console.log(model);
        model.createDiscussion(id,discussion)
            .then(function(data){
                model.getAllDiscussions()
                    .then(function(response){
                        for(var v in response){
                            if(response[v].discussion.length>0) {
                                /*var discu = {
                                 name: response[v].discussion.name,
                                 _id: response[v].discussion._id,
                                 description :response[v].discussion.description
                                 }*/
                                discussion.push(response[v].discussion);
                            }
                        }
                        console.log(response);
                        res.json(discussion);
                    },function(err){
                        console.log(err);
                    });

             //   res.json(data.discussion);
            },function(err){
                res.status(400);
            })
    }

    function deleteDiscussion(req,res){
        var discussionId = req.params['discussionid'];
        var artistId = req.params['artistId'];
        model.deleteDiscussion(artistId,discussionId)
            .then(function(data){
                res.json(data.discussion);
            },function(err){
                res.status(400);
            });
    }

    function getDiscussion(req,res){
        var discussionId = req.params['discussionid'];
        var artistId = req.params['artistId'];
        model.getDiscussion(artistId,discussionId)
            .then(function(data){
                res.json(data);
            },function(err){
                res.status(400);
            });
    }

    function comment(req,res){
        var discussionId = req.params['discussionid'];
        var artistId = req.params['artistId'];
        var comment = req.body;
        var dis ={};
        model.comment(artistId,discussionId,comment)
            .then(function(data){
                for(var v in data.discussion){
                    if(data.discussion[v]._id==discussionId){
                        dis = data.discussion[v];
                        break;
                    }
                }
                res.json(dis);
            },function(err){
                res.status(400);
            });
    }

    function getAllDiscussions(req,res){
        var discussion = new Array();
        model.getAllDiscussions()
            .then(function(response){
                for(var v in response){
                    if(response[v].discussion.length>0) {
                        /*var discu = {
                            name: response[v].discussion.name,
                            _id: response[v].discussion._id,
                            description :response[v].discussion.description
                        }*/
                        discussion.push(response[v].discussion);
                    }
                }
                console.log(response);
                res.json(discussion);
            },function(err){
                console.log(err);
            });
    }


    function likeComment(req,res){
        var artistId = req.params['artistId'];
        var userId = req.params['userId'];
        var discussionId = req.params['discussionId'];
        var commentId = req.params['commentId'];
        console.log("likig the in servic");

        model.likeComment(artistId,userId,discussionId,commentId)
            .then(function(response){
                res.json(response);
            })

    }

}