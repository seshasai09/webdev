// this file is mirror image of user service in client
//var passport         = require('passport');
//var LocalStrategy    = require('passport-local').Strategy;
module.exports=function(app,model){
    app.post("/api/project/artist/login",login);
    app.get("/api/project/artist/isLoggedin",isLoggedin);
    app.get("/api/project/artist/getArtistsList",getArtistsList);
    app.post("/api/project/artist/addArtists",addArtist);
    app.get("/api/project/artist/:artistId/getPosts",getPosts);
    app.get('/api/project/artist/register/:artistName',artistRegister)
    app.get('/api/project/artist/all/',getAllArtistRequests);
    app.get('/api/project/artistRequest/delete/:artistName',deleteArtistFromRequest);
    app.get('/api/project/artists',getAllArtists);
    app.delete('/api/project/admin/artist/:id',deleteArtist);
    app.put("/api/project/artist/:id",updateArtist);
  //  app.post("/api/project/register",register);

  //  passport.use('alocal',new LocalStrategy(localStrategy));



    function localStrategy(username, password, done){
        console.log(username, password);
        console.log("in local strategy");
        console.log(username, password);

        model.findUserByCredentials({username:username,password:password})
            .then(function(user){
                    console.log("user is");
                    console.log(user);
                    if(user ){
                        //    console.log("user is logged in");
                        return done(null,user);
                    }else{
                        //   console.log("user password is wrong");
                        return done(null, false);
                    }

                    // once successfule user is in the request.user object. Is user exists then chain is continued else chain is broken and error is thrown
                },
                function(err){
                    if(err){
                        console.log("error");
                        return done(err);
                        //done takes two arguments one of them is error if there is an error second argument is the authenticated user. null is for no error

                    }
                });
    }





    function login(req,res){

        console.log("in login of artist");
        var user = req.body;
        //  console.log("in server"+req)
        //console.log("in server user is "+user);
        model.findUserByCredentials(user)
            .then(function(user){
                req.session.currentUser=user; //if we find user we are saving the user into session tyo make stateful interaction
                // cookies are commiunicated using headers, cookies are used to follow users. Session is like an hashmap
                req.session.type="artist";
                console.log(req.session.currentUser)
                res.json(user);
            },function(err){
                res.status(400);
            })// data model manipulates the data

      //  res.json(req.user);

        // res.send(200);

    }

    function isLoggedin(req,res){
        console.log("checking if user is logged in in server");
     //   console.log(req.session.currentUser);
        console.log("test")
        console.log(req.user);
       // res.json(req.isAuthenticated()? req.user:null);
        res.json(req.session.currentUser);
    }

    function logout(req,res){
        req.session.destroy();
        res.send(200);
    }

    function register(req,res){
        var user= req.body;
        model.createUser(user)
            .then(function(user){
                req.session.currentUser = user;
                res.json(user);
            },function(err){
                res.status(err).send;
            })

    }

    function addArtist(req,res){
        var artist = req.body;
        console.log(artist);
        model.addArtists(artist)
            .then(function(response){
               // response.json(response);
                res.status(200);
            },function(err){
                res.status(400);
            });
    }

    function getArtistsList(req,res){
      var artists=  model.getArtistsList();

        res.json(artists);

    }

    function getPosts(req,res){
        artistId = req.params['artistId'];
        console.log(artistId);
        model.getPosts(artistId)
            .then(function(response){
            res.json(response);
        },function(err){
            res.status(400);
        });
    }

    function artistRegister(req,res){
        console.log(req.params['artistName']);
        model.artistRegister(req.params['artistName'])
            .then(function(response){
                res.status(200);
            },function(err){
                res.status(400);
            })
    }

    function getAllArtistRequests(req,res){
        model.getAllArtistRequests()
            .then(function(response){
                res.json(response);
            });
    }
    function deleteArtistFromRequest(req,res){
        model.deleteArtistFromRequest(req.params['artistName'])
            .then(function(response){
                model.getAllArtistRequests()
                    .then(function(response){
                        res.json(response);
                    });
            },function(err){
                res.status(400);
            })
    }

    function getAllArtists(req,res){
        model.getAllArtists()
            .then(function(response){
                res.json(response);
            });
    }

    function deleteArtist(req,res){
        model.deleteArtist(req.params['id'])
            .then(function(response){
                model.getAllArtists()
                    .then(function(response){
                        res.json(response);
                    });
            })
    }

    function updateArtist(req,res){
        console.log("updating artist");
        var id = req.params["id"];
        var artist = req.body;
        console.log(artist);

        model.updateArtistById(id,artist)
            .then(function(artist){
                console.log("user updated");
                console.log(user);
                req.json(user);
            },function(err){
                res.status(400).send(err);
            });

    }







}