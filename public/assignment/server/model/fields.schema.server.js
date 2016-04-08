var mongoose = require('mongoose');

module.exports= function(){

    var FieldsSchema = mongoose.Schema({
        label:String,
        type:{
            type: String,
            enum: ['TEXT','TEXTAREA','EMAIL','PASSWORD','OPTIONS','DATE','RADIO','CHECKBOX'],
            default: 'TEXT'
        },
        placeholder: String,
        options:[{label:String,value:String}]
    },{collection:'field'});

    return FieldsSchema;
};