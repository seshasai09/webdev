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

        model.findUserByCredentials(user)
            .then(function(user){
                req.session.currentUser=user;
                res.json(user);
            },function(err){
                if(err){
                    res.status(400).send(err);
                }
            });

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
        req.session.destroy();
        res.send(200);
    }

    function addNewUser(req,res){

        var user=req.body;
       // user._id=uuid.v1();
        model.createUser(user)
            .then(function(user){
                req.session.currentUser=user;
                res.json(user);
            },function(err){
                if(err){
                    res.status(400).send(err);
                }
            });
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
         model.findAllUsers().
         then(function(users){
             res.json(users);
         },function(err){
             res.status(400).send(err);
         });


    }

  /*  function findUserByUsername(req,res){
        var userName = req.params["username"];
        console.log(userName);
       var user= model.findUserByUsername(userName);
        res.json(user);
    }*/

    function updateUser(req,res){

        var id = req.params["id"];
        var user = req.body;
        var users= model.updateUserById(id,user)
            .then(function(users){
                req.session.currentUser=users;
                res.json(users);
            },function(err){
                res.status(400).send(err);
            })

    }

    function deleteUserById(req,res){
        var id = req.params["id"];
        console.log("the id is"+id);
        model.deleteUserById(id)
            .then(function(){
                res.send(200);
            });

    }
}