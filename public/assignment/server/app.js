module.exports=function(app,uuid){
    var userModel = require("./model/user.model.server.js")();
    var formModel = require("./model/form.model.js")();
    var userService=require("./services/user.service.server.js")(app,userModel);
    var formService=require("./services/form.service")(app,formModel);
    var fieldService=require("./services/field.service.server")(app,formModel);
    //responsibility of service is to interface between http world and data world.
    //http comes from client by making $http call from client. this call reaches the service which sends the
    // data from service to model

}