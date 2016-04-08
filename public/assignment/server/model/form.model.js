var mongoose = require('mongoose');
var q = require("q");
module.exports=function(){

    var FormSchema = require('./form.schema.server')();
    var Form = mongoose.model('Form',FormSchema);

    var forms = require("./form.mock.json");
    var api ={
        createFormForUser: createFormForUser,
        findAllFormsForUser: findAllFormsForUser,
        deleteFormById: deleteFormById,
        updateFormById: updateFormById,
        findFormByTitle: findFormByTitle,
        findFieldsForForms: findFieldsForForms,
        getMongooseModel:getMongooseModel

    }
    return api;

    function getMongooseModel() {
        return Form;
    }

    function createFormForUser(form){
        var deferred = q.defer();

        Form.create(form,function(err,form){
            if(!err){
                deferred.resolve(form);
            }else{
                deferred.reject(err);
            }
        })
        return deferred.promise;
    }

    function deleteFormById(id){
        return Form.remove({_id:id});
    }

    function findAllFormsForUser(id){
      return Form.find({userId:id});
    }

    function updateFormById(id,form){
        delete form['_id']
        return Form.findOneAndUpdate({_id:id},
            {$set: form});
    }

    function findFormByTitle(title){
        console.log("in model of server "+title);

        for( var u in forms){
            if(forms[u].title===title) {
                return forms[u];
            }
        }

        return null;
    }

    function findFieldsForForms(formId){
        var index=0;
        for( var u in forms){
            if(forms[u]._id===formId){
                break;
            }
            index++;
        }

        return forms[index].fields;
    }








}
