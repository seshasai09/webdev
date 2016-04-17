var express = require('express');
var bodyParser = require('body-parser');// to parse jason objects from header
var passport = require('passport')
var cookieParser = require('cookie-parser');// to parse cookies from header
var session = require('express-session');//node module . once loaded we need to configure
//var uuid = require('node-uuid');
var mongoose = require('mongoose');
var connectionString='mongodb://localhost/FormBuilderApp';

if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
    connectionString = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
        process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
        process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
        process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
        process.env.OPENSHIFT_APP_NAME;
}
var db = mongoose.connect(connectionString);
var app = express();
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
/*app.use(session({secret:"MSocialApp",
                   resave:true,
         saveUninitialized: true   }));*/
console.log(process.env.PASSPORT_SECRET);
var secret = process.env.PASSPORT_SECRET;
if(process.env.OPENSHIFT_PASSPORT_SECRET){
    secret = process.env.OPENSHIFT_PASSPORT_SECRET;
}
app.use(session({secret:secret,
    resave:true,
    saveUninitialized: true   }));
app.use(cookieParser());
app.use(passport.initialize()); // add features to express . Passport takes express objects  and adds them features.
// for example if user login then it adds currently logged in user to the request.user object its a brand new request object.
app.use(passport.session());
var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;
app.get('/hello', function(req, res){
    res.send('hello world!');
});
require("./public/assignment/server/app.js")(app,db);
require("./public/project/server/app.js")(app,db);
app.listen(port, ipaddress);