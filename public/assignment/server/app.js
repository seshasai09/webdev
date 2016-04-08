module.exports=function(app,db){
    var userModel = require("./model/user.model.server.js")(db);
    var formModel = require("./model/form.model.js")(db);
   // var fieldModel = require("./model/field.model.js")(db);
    var userService=require("./services/user.service.server.js")(app,userModel);
    var formService=require("./services/form.service")(app,formModel);
    var fieldService=require("./services/field.service.server")(app,formModel);
    //responsibility of service is to interface between http world and data world.
    //http comes from client by making $http call from client. this call reaches the service which sends the
    // data from service to model

}