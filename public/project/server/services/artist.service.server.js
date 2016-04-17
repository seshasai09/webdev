// this file is mirror image of user service in client
module.exports=function(app,model){
    app.post("/api/project/artist/login",login);
    app.get("/api/project/artist/isLoggedin",isLoggedin);
  //  app.post("/api/project/register",register);

    function login(req,res){
        var user = req.body;
        //  console.log("in server"+req)
        //console.log("in server user is "+user);
        model.findUserByCredentials(user)
            .then(function(user){
                req.session.currentUser=user; //if we find user we are saving the user into session tyo make stateful interaction
                // cookies are commiunicated using headers, cookies are used to follow users. Session is like an hashmap
                console.log(req.session.currentUser)
                res.json(user);
            },function(err){
                res.status(400);
            })// data model manipulates the data

        // res.send(200);

    }

    function isLoggedin(req,res){
        console.log("checking if user is logged in in server");
        console.log(req.session.currentUser);
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


}