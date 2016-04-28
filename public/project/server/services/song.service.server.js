module.exports=function(app,Artistmodel,Usermodel) {
    app.post('/api/project/user/:userId/song/favorite', userFavorite);
    app.post('/api/project/artist/:artistId/song/favorite', artistFavorite);
    app.get('/api/project/user/:userId/song/favorite', getUserFavorite);
    app.get('/api/project/artist/:artistId/song/favorite', getArtistFavorite);
    app.delete('/api/project/user/:id/song/favorite/:trackid',removeSongFromFavorites);






    var model = require('../models/songs/song.model')(Artistmodel,Usermodel);


    function userFavorite(req,res){
        var song =req.body;
        var id = req.params['userId'];

        model.userFavorite(id,song)
            .then(function(data){
                console.log(data);
                res.status(200);
            },function(err){
                res.status(400);
            });
    }

    function getUserFavorite(req,res){
      //  var song =req.body;
        var id = req.params['userId'];

        model.getUserFavorite(id)
            .then(function(data){
                console.log(data);
                res.json(data);
            },function(err){
                res.status(400);
            });
    }

    function artistFavorite(req,res){
        var song =req.body;
        var id = req.params['artistId'];

        model.artistFavorite(id,song)
            .then(function(data){
                console.log(data);
                res.status(200);
            },function(err){
                res.status(400);
            });
    }

    function getArtistFavorite(req,res){
        var id = req.params['artistId'];

        model.getArtistFavorite(id)
            .then(function(data){
                console.log(data);
                res.json(data);
            },function(err){
                res.status(400);
            });
    }

    function removeSongFromFavorites(req,res){
        var id = req.params['id'];
        var trackid = req.params['trackid'];

        model.removeSongFromFavorites(id,trackid)
            .then(function(data){
                console.log(data);
                res.json(data.favorites);
            },function(err){
                res.status(400);
            });
    }



}