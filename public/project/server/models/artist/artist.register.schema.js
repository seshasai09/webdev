var mongoose = require('mongoose');
module.exports = function(){

    var ArtistRegisterSchema = mongoose.Schema({
        username:String

    },{collection:'artistRegister'});

    return ArtistRegisterSchema;
}