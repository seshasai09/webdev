var mongoose = require('mongoose');
var q = require('q');

module.exports = function(formModel){
    var FieldSchema = require('./fields.schema.server.js')();
    var Field = mongoose.model('Field',FieldSchema);

    var Form = formModel.getMongooseModel();


    var api = {
        findFieldsForForms: findFieldsForForms,
        createFieldForForm:createFieldForForm,
        updateField:updateField,
        deleteFieldById:deleteFieldById,
        sortField:sortField
    }

    return api;

    function sortField(formId, startIndex, endIndex) {
        return Form
            .findById(formId)
            .then(
                function(form) {
                    form.fields.splice(endIndex, 0, form.fields.splice(startIndex, 1)[0]);

                    // notify mongoose 'pages' field changed
                    form.markModified("fields");
                    form.save();
                }
            );
    }


    function findFieldsForForms(formId){
       return Form.findById(formId).select('fields');
    }



    function createFieldForForm(formId,field){
       return Form.findById(formId)
           .then(function(form){
               form.fields.push(field);
               return form.save();
           });
    }


    function deleteFieldById(formId,fieldId){

   return Form.findById(formId)
       .then(function(form){
           form.fields.id(fieldId).remove();
           return form.save();
       })

    }

    function updateField(formId,fieldId,field){
        return Form.findById(formId)
            .then(function(form){
                //form.fields.push(field);
                var Field =form.fields.id(fieldId);
              //  Field=field;
                switch(Field.type){
                    case "TEXT":
                        Field.label=field.label;
                        Field.placeholder=field.placeholder;
                        form.updated=Date.now();
                        return form.save();
                    case "TEXTAREA":
                        Field.label=field.label;
                        Field.placeholder=field.placeholder;
                        form.updated=Date.now();
                        return form.save();
                    case "DATE":
                        Field.label=field.label;
                        return form.save();
                        form.updated=Date.now();
                    case "OPTIONS":
                        console.log(field);
                        Field.label=field.label;
                        Field.options=field.options;
                        console.log(Field.options);
                        form.updated=Date.now();
                        return form.save();
                    case "CHECKBOX":
                        Field.label=field.label;
                        Field.options=field.options;
                        form.updated=Date.now();
                        return form.save();
                    case "RADIO":
                        Field.label=field.label;
                        Field.options=field.options;
                        form.updated=Date.now();
                        return form.save();
                }


            });
    }
}