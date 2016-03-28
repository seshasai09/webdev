var express = require('express');
var bodyParser = require('body-parser');// to parse jason objects from header
var cookieParser = require('cookie-parser');// to parse cookies from header
var session = require('express-session');//node module . once loaded we need to configure
//var uuid = require('node-uuid');
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
require("./public/assignment/server/app.js")(app);
require("./public/project/server/app.js")(app);
app.listen(port, ipaddress);