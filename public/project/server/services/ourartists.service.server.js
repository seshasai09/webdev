module.exports=function(app,Artistmodel,UserModel) {
   // app.post('/api/project/artist/discussion/:id', createDiscussion);
   // app.delete('/api/project/artist/:artistId/discussion/:discussionid',deleteDiscussion);
    app.get('/api/project/ourArtists',getAllArtists);
    app.get('/api/project/ourArtists/artist/:artistId',getArtist);
   // app.post('/api/project/artist/:artistId/discussion/:discussionid',comment);
    // app.get('/api/project/artist/:artistId/discussion/:discussionid',deleteDiscussion);



   // var model = require('../models/discussion/discussion.model.server.js')(Artistmodel);

    function getAllArtists(req,res){
        Artistmodel.getAllArtists()
            .then(function(response){
            console.log(response);
                res.json(response);
        },function(err){
                console.log(err);
                res.status(err);
            });
    }


    function getArtist(req,res){
      ///  var discussion =req.body;
        var id = req.params['artistId'];
          console.log(id);
        Artistmodel.getArtist(id)
            .then(function(data){
                console.log("")
console.log(data);
                res.json(data);
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





}