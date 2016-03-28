module.exports=function(app){
    var model = require("./models/user.model.server.js")();
    var service=require("./services/user.service.server.js")(app,model);
    //responsibility of service is to interface between http world and data world.
    //http comes from client by making $http call from client. this call reaches the service which sends the
    // data from service to model

}