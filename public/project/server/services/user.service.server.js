// this file is mirror image of user service in client
module.exports=function(app,model){
    app.post("/api/project/login",login);
    app.get("/api/project/isLoggedin",isLoggedin);
    app.post("/api/project/logout",logout);
    app.post("/api/project/register",register);

    function login(req,res){
        var user = req.body;
      //  console.log("in server"+req)
        //console.log("in server user is "+user);
        var user =model.findUserByCredentials(user); // data model manipulates the data

       // res.send(200);
        req.session.currentUser=user; //if we find user we are saving the user into session tyo make stateful interaction
        // cookies are commiunicated using headers, cookies are used to follow users. Session is like an hashmap
        console.log(req.session.currentUser)
        res.json(user);
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
       user= model.createUser(user);
        req.session.currentUser=user;
        res.json(user);
    }
}