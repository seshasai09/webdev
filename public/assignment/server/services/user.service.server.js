module.exports=function(app,model){
    app.post("/api/assignment/login",login);
    app.get("/api/assignment/checkLoggedin",checkLoggedin);
    app.get("/api/assignment/logout",logout);
    app.post("/api/assignment/user",addNewUser);
    app.get("/api/assignment/user",findAllUsers);
    app.get("/api/assignment/user/userId/:id",findUserById);
    app.get("/api/assignment/user/userName/:username",findUserByUsername);
   // app.get("/api/assignment/user?username=alice&password=wonderland",)
    app.put("/api/assignment/user/:id",updateUser);
    app.delete("/api/assignment/user/:id",deleteUserById);



    var uuid = require('uuid');

    function login(req,res){
        var user = req.body;
          var user=model.findUserByCredentials(user);
        req.session.currentUser=user;
        console.log("setting user in session");
        console.log(req.session.currentUser);
        res.json(user);
    }

    function checkLoggedin(req,res){
     //   var user=req.body;
        console.log("checking if user is logged in");
        console.log(req.session.currentUser);
        var user=req.session.currentUser;
        res.json(user);
    }

    function findUserByUsername(req,res){
        var uName= req.params["username"];
        console.log(uName);
        var user = model.findUserByUsername(uName);
        res.json(user);
    }

    function  logout(req,res){
        req.session.destroy();
        res.send(200);
    }

    function addNewUser(req,res){
        console.log("new user id is");
      //  var myUuid = uuid.noConflict();
       // console.log(uuid.v1());
        var user=req.body;
        user._id=uuid.v1();
        model.createUser(user);
        res.send(200);
    }

    function findUserById(req,res){
        var id = req.params["id"];
        console.log(id);
        var user= model.findUserById(id);
        console.log("user with id is");
        console.log(user);
        res.json(user);

    }

    function findAllUsers(req,res){
        var users = model.findAllUsers();
        res.json(users);

    }

  /*  function findUserByUsername(req,res){
        var userName = req.params["username"];
        console.log(userName);
       var user= model.findUserByUsername(userName);
        res.json(user);
    }*/

    function updateUser(req,res){
        console.log("updating user");
        var id = req.params["id"];
        var user = req.body;
        console.log(id);
        console.log(user);

        var users= model.updateUserById(id,user);
        req.session.currentUser=model.findUserByUsername(uName.username);
        res.json(users);
    }

    function deleteUserById(req,res){
        var id = req.params["id"];
        console.log("the id is"+id);
        model.deleteUserById(id);
        res.send(200);
    }
}