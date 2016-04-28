module.exports=function(app,db,Artistmodel,Usermodel){
    //var Artistmodel = require("./models/artist/artist.model.server.js")(db);
    var Artistservice=require("./services/artist.service.server")(app,Artistmodel);
 //   var Usermodel = require("./models/user/user.model.server.js")(db,Artistmodel);
    var Userservice=require("./services/user.service.server.js")(app,Usermodel);
    var Postservice=require("./services/post.service.server")(app,Artistmodel,Usermodel);
    var Discussionservice=require("./services/discussion.service.server")(app,Artistmodel);
    var OurArtistsservice=require("./services/ourartists.service.server")(app,Artistmodel,Usermodel);
    var Postservice=require("./services/song.service.server")(app,Artistmodel,Usermodel);
    //responsibility of service is to interface between http world and data world.
    //http comes from client by making $http call from client. this call reaches the service which sends the
    // data from service to model

}