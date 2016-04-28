// this file is mirror image of user service in client
var passport         = require('passport');
var LocalStrategy    = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
module.exports=function(app,model){
    app.post("/api/project/login",passport.authenticate('local'),login);
    app.get("/api/project/isLoggedin",isLoggedin);
    app.post("/api/project/logout",logout);
    app.post("/api/project/register",register);
    app.get("/api/project/user/:userId/follow/:artistId",follow);
    app.get("/api/project/users/all",getAllUsers);
    app.delete("/api/project/admin/user/:userId",deleteUserById);
    app.put("/api/project/user/:id",updateUser);


    app.get   ('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect: '/project/client/#/profile',
            failureRedirect: '/#/login'
        }));


    var facebookConfig = {

        clientID        : process.env.FACEBOOK_CLIENT_ID,
        clientSecret    : process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL     : process.env.FACEBOOK_CALLBACK_URL
      //  clientID        : "682607991878042",
       // clientSecret    : "67553f5cb2bc6caeddff07c51d866172",
       // callbackURL     : "/auth/facebook/callback"
    };

    passport.use('local',new LocalStrategy(localStrategy));
    passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));
//    passport.serializeUser(serializeUser);
  //  passport.deserializeUser(deserializeUser);


    function localStrategy(username, password, done){
        console.log("in local strategy");

        model.findUserByUsername(username)
            .then(function(user){
                    console.log("user is");
                    //console.log(user);
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





    function facebookStrategy(token, refreshToken, profile, done) {
        model
            .findUserByFacebookId(profile.id)
            .then(
                function(user) {
                    if(user) {
                        console.log(user);
                        console.log("user alreade present");
                        return done(null, user);
                    } else {
                        var names = profile.displayName.split(" ");
                        var newFacebookUser = {
                            lastname:  names[1],
                            firstname: names[0],
                            type:"user",
                            imageMURL:"http://www.realestatetaxgroup.com/wp-content/uploads/2013/03/empty-profile.png",
                            email:     profile.emails ? profile.emails[0].value:"",
                            facebook: {
                                id:    profile.id,
                                token: token
                            }
                        };
                        return model.createUserFromFacebook(newFacebookUser);
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            )
            .then(
                function(user){
                    return done(null, user);
                },
                function(err){
                    if (err) { return done(err); }
                }
            );
    }

   /* function serializeUser(user, done) {
        console.log(user);
        console.log(done);
        console.log("in searlize");
        done(null, user);
    }

    function deserializeUser(user, done) {
        model
            .findUserById(user._id)
            .then(
                function(user){
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );
    }*/







    function login(req,res){
        var user = req.body;
     //  console.log("in server"+req)
        //console.log("in server user is "+user);
     //   console.log(user);
       /* model.findUserByCredentials(user)
            .then(function(user){
                req.session.currentUser=user; //if we find user we are saving the user into session tyo make stateful interaction
                // cookies are commiunicated using headers, cookies are used to follow users. Session is like an hashmap
            //    console.log(req.session.currentUser)
                res.json(user);
            },function(err){
                res.status(400);
            })// data model manipulates the data*/
        var user = req.body;
       // delete user.password;

        res.json(req.user);

       // res.send(200);

    }

    function isLoggedin(req,res){
        console.log("checking if user is logged in in server");
      //  console.log(req.session.passport.user);
       // console.log(req.user);
        console.log(req.session.currentUser);
       // console.log(req);
      //  console.log(req);
        if(req.session.currentUser!=null){
            res.json(req.session.currentUser);
        }else {
            res.json(req.isAuthenticated() ? req.user : null);
        }
     //  res.json(req.session.currentUser);
    }

    function logout(req,res){
        req.session.destroy();
        res.send(200);
    }

    function register(req,res){

        var new_user=req.body;
        console.log("in register");
        // user._id=uuid.v1();
        //  new_user.roles = ['student'];
        model.findUserByUsername(new_user.username)
            .then(function(user){
                if(user!=null){
                    res.json(null);
                }else{
                    return model.createUser(new_user)
                }
            },function(err){
                res.status(400).send(err);
            })
            .then(function(user){
                if(user){
                    req.login(user,function(err){
                        if(err){
                            res.status(400).send(err);
                        }else{
                            res.json(user);
                        }
                    });
                }
            },function(err){
                res.status(400).send(err);
            });





        /*var user= req.body;
        model.createUser(user)
            .then(function(user){
                req.session.currentUser = user;
                res.json(user);
            },function(err){
                res.status(err).send;
            });*/
    }

    function follow(req,res){
        var userId = req.params['userId'];
        var artistId = req.params['artistId'];
     //   console.log("follow");
        model.follow(userId,artistId)
            .then(function(response){
            //    console.log(response);

            },function(err){
                res.send(400);
            });
    }

    function getAllUsers(req,res){
     //   console.log("all user");
        model.getAllUsers()
            .then(function(response){
                res.json(response);
            })
    }

    function deleteUserById(req,res){
        var userId = req.params['userId'];
        model.deleteUserById(userId)
            .then(function(response){
                model.getAllUsers()
                    .then(function(response){
                        res.json(response);
                    });
            })
    }


    function updateUser(req,res){
        console.log("updating user");
        var id = req.params["id"];
        var user = req.body;
        console.log(user);

        model.updateUserById(id,user)
            .then(function(user){
                console.log("user updated");
                console.log(user);
                req.json(user);
            },function(err){
                res.status(400).send(err);
            });

    }
}