var passport         = require('passport');
var mongoose = require('mongoose');

module.exports = function(app,db) {




    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    var Artistmodel = require("./project/server/models/artist/artist.model.server.js")(db);
 //   var Artistservice=require("./services/artist.service.server")(app,Artistmodel);
    var projectUsermodel = require("./project/server/models/user/user.model.server.js")(db,Artistmodel)
  //  var projectUserservice=require("./services/user.service.server.js")(app,projectUsermodel);

    var assignmentuserModel = require("./assignment/server/model/user.model.server.js")(db);
  //  var assignmentuserService=require("./assignment/server/services/user.service.server.js")(app,assignmentuserModel);

  //  var Usermodel = require("./models/user/user.model.server.js")(db,Artistmodel);
    //   var Userservice=require("./services/user.service.server.js")(app,Usermodel);

    require("./assignment/server/app.js")(app,db,assignmentuserModel);
    require("./project/server/app.js")(app,db,Artistmodel,projectUsermodel);


    function serializeUser(user, done) {
        console.log("in searilize");
        console.log(user);
        done(null, user);
    }

    function deserializeUser(user, done) {
        console.log("in deserailize");
        console.log(user);

        if(user.type != undefined) {
            projectUsermodel
                .findUserById(user._id)
                .then(
                    function(user){
                        done(null, user);
                    },
                    function(err){
                        done(err, null);
                    }
                );
        } else {
            assignmentuserModel
                .findUserById(user._id)
                .then(
                    function(user){
                        done(null, user);
                    },
                    function(err){
                        done(err, null);
                    }
                );
        }
    }
};