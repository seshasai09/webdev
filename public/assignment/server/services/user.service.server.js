// on the server side now we are going to use passport. passport has been initialized in server
var passport = require('passport');// core library we are loading herr
var LocalStrategy = require('passport-local').Strategy;// load the strategy. we are instatntiating an object and using it
var bcrypt = require("bcrypt-nodejs");

module.exports=function(app,model){

    var auth = authorized;
    app.post("/api/assignment/login",passport.authenticate('local'),login); // we are letting passport handle the user login validations
    // since we are using local strategy we have to implement the validations. We need to configure passport to find username and password
   // . I want passport to intercept login function. passport should first look at the request do its magic. if successful then allow,
    // user to let through else not allow. Passport extracts the username and password from the request and then asks someone to
    // do the next steps. This returns aither exception or null or user object. we need to configure local strategy
    app.get("/api/assignment/loggedin",loggedin);
    app.post("/api/assignment/logout",logout); // we post logout
    app.post("/api/assignment/user",register);
    app.post("/api/assignment/admin/user",auth,createUser);
    app.get("/api/assignment/admin/user",auth,findAllUsers);
    app.get("/api/assignment/user/userId/:id",findUserById);
    app.get("/api/assignment/admin/user/:userId",findUserById);
    app.get("/api/assignment/user/userName/:username",findUserByUsername);
   // app.get("/api/assignment/user?username=alice&password=wonderland",)
    app.put("/api/assignment/user/:id",updateUser);
    app.put("/api/assignment/admin/user/:userId",auth,updateUserByAdmin);
   // app.delete("/api/assignment/user/:id",deleteUserById);
    app.delete("/api/assignment/admin/user/:id",auth,deleteUserById );


    passport.use('local',new LocalStrategy(localStrategy)); // we use local strategy and the configuration for the strategy is 'localstrategy is
    //  function we define in this class'
    /*passport.serializeUser(serializeUser);// callback function that enciphering and deciphhering the cookie
    //passes us current uer object
    passport.deserializeUser(deserializeUser);*/

    function localStrategy(username, password, done){
        console.log("in local strategy j zc  xzc ,");

        model.findUserByUsername(username)
            .then(function(user){
                console.log("user is");
                console.log(user);
                if(user && bcrypt.compareSync(password,user.password)){
                    console.log("user is logged in");
                    return done(null,user);
                }else{
                    console.log("user password is wrong");
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

  /*  function serializeUser(user,done){
        done(null,user);
    }

    function deserializeUser(user, done){
        model.findUserById(user._id)
            .then(function(user){
                done(null,user);
            },function(err){
                done(err,null);
            });
    }*/

    var uuid = require('uuid');

    function login(req,res){
       // var user = req.body;
     //   var user = req.user; // passport has checked in the database whether user is logged in
        // if user is there then it adds the user to the request object. we retrive it from the request object
        var user = req.body;
        delete user.password;

        res.json(req.user);

        /*model.findUserByCredentials(user)
            .then(function(user){
                req.session.currentUser=user;
                res.json(user);
            },function(err){
                if(err){
                    res.status(400).send(err);
                }
            });*/

    }

    function loggedin(req,res){
        res.json(req.isAuthenticated()? req.user:null);
    }

    function findUserByUsername(req,res){
        var uName= req.params["username"];
        console.log(uName);
        var user =
            model.findUserByUsername(uName)
                .then(function(user){
                    console.log("user by username is");
                    console.log(user);
                    res.json(user);
                },function(err){
                    res.status(400).send(err);
                });

    }

    function  logout(req,res){
       /// req.session.destroy();
        req.logOut(); // this is function added by passport when we initialize it.this will work for all strategies
        res.send(200);
    }

    function register(req,res){

        var new_user=req.body;
        console.log("in register");
       // user._id=uuid.v1();
      //  new_user.roles = ['student'];
        model.findUserByUsername(new_user.username)
            .then(function(user){
                console.log(user)
                console.log("is user");
                if(user!=null){
                    console.log(user);
                    res.json(null);
                }else{
                    console.log("bcrypting password");
                    new_user.password=bcrypt.hashSync(new_user.password);
                    console.log("in password bcrypt");
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
      /*  model.createUser(user)
            .then(function(user){
                req.user=user;
                res.json(user);
            },function(err){
                if(err){
                    res.status(400).send(err);
                }
            });*/
    }

    function createUser(req,res){
        var newUser = req.body;
        //newuser.roles = ['student'];
        if(isAdmin(req.user)){
            model.findUserByUsername(newUser.username)
                .then(function(user){
                    if(user==null){
                        newUser.password=bcrypt.hashSync(newUser.password);
                        return model.createUser(newUser)
                            .then(function(){
                                return model.findAllUsers();
                            },function(err){
                                res.status(400).send(err);
                            });
                    }else{
                        return model.findAllUsers();
                    }
                })
                .then(function(users){
                    res.json(users);
                },function(err){
                    res.status(400).send(err);
                })
        }else {
            res.status(403);
        }

    }

    function  updateUserByAdmin(req,res) {
        var id = req.params['userId'];
        var user = req.body;

        if(user.hasOwnProperty('password')){
            user.password=bcrypt.hashSync(user.password);
        }
        console.log("updating user by dmin");
        console.log(user);
        if (isAdmin(req.user)) {
            model.updateUserById(id, user)
                .then(function () {
                    return model.findAllUsers();
                }, function (err) {
                    res.status(400).send(err);
                })
                .then(function (users) {
                    res.json(users);
                }, function (err) {
                    res.status(400).send(err);
                });
        } else
            res.status(403);
    }


    function deleteUserById(req,res){
        var id = req.params['id'];
        if(isAdmin(req.user)){
            model.deleteUserById(id)
                .then(function(){
                    return model.findAllUsers();
                },function(err){
                    res.status(400).send(err);
                })
                .then(function(users){
                    res.json(users);
                },function(){
                    res.status(400)
                });
        }else {
            res.status(403);
        }
    }


    function findUserById(req,res){
        var id = req.params["id"];
        var user= model.findUserById(id);
        res.json(user);

    }

    function findAllUsers(req,res){
        if(isAdmin(req.user)) {
            model.findAllUsers().then(function (users) {
                res.json(users);
            }, function (err) {
                res.status(400).send(err);
            });
        }else{
            res.status(403);
        }

    }



    function updateUser(req,res){
        console.log("updating user");
        var id = req.params["id"];
        var user = req.body;
        if(user.hasOwnProperty('password')){
            user.password=bcrypt.hashSync(user.password);
        }
       // return model.createUser(newUser)
        model.updateUserById(id,user)
            .then(function(user){
                console.log("updated the user");
                console.log(user);
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

    }

   /* function deleteUserById(req,res){
        var id = req.params["id"];
        model.deleteUserById(id)
            .then(function(){
                res.send(200);
            });

    }*/

    function isAdmin(user){
        if(user.roles.indexOf('admin')>=0){
            return true;
        }
        return false;
    }


    function authorized(req,res,next){
        if(!req.isAuthenticated()){
            res.send(401);
        }else{
            next();
        }
    }


}