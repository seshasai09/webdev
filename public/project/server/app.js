module.exports=function(app,db){
    var Usermodel = require("./models/user/user.model.server.js")(db);
    var Userservice=require("./services/user.service.server.js")(app,Usermodel);
    var Artistmodel = require("./models/artist/artist.model.server.js")(db);
    var Artistservice=require("./services/artist.service.server")(app,Artistmodel);
    var Postservice=require("./services/post.service.server")(app,Artistmodel);
    //responsibility of service is to interface between http world and data world.
    //http comes from client by making $http call from client. this call reaches the service which sends the
    // data from service to model

}