var express = require('express');
var bodyParser = require('body-parser');// to parse jason objects from header
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
app.use(session({secret:"MSocialApp"}));
app.use(cookieParser());
var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;
app.get('/hello', function(req, res){
    res.send('hello world!');
});
require("./public/assignment/server/app.js")(app,db);
require("./public/project/server/app.js")(app,db);
app.listen(port, ipaddress);