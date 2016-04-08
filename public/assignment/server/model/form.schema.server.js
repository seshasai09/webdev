var mongoose = require('mongoose');

module.exports = function(){
    var FieldSchema = require('./fields.schema.server.js')();
    var FormSchema = mongoose.Schema({
        userId: String,
        title: String,
        fields: [FieldSchema],
        created: {
            type: Date,
            default: Date.now()},
        updated: {
            type: Date,
            default: Date.now()}
    },{collectiion:'form'});
    return FormSchema;
};