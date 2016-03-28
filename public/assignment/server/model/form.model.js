module.exports=function(){

    var forms = require("./form.mock.json");
    var api ={
        createFormForUser: createFormForUser,
        findAllFormsForUser: findAllFormsForUser,
        deleteFormById: deleteFormById,
        updateFormById: updateFormById,
        findFormByTitle: findFormByTitle,
        findFieldsForForms: findFieldsForForms,
        createFieldForForm:createFieldForForm,
        updateField:updateField,
        deleteFieldById:deleteFieldById

    }
    return api;

    function createFormForUser(form){
        form.fields=[];
        forms.push(form);
        console.log(forms);
    }

    function deleteFormById(id){

        var index=0;
        for( var u in forms){

            if(parseInt(forms[u]._id)==parseInt(id)){
                break;
            }
            index++;
        }
        forms.splice(index,1);
        return null;

    }

    function findAllFormsForUser(id){
        var formsbyuser=[];
        for(var v in forms){
            if(parseInt(forms[v].userId)==parseInt(id)){
                formsbyuser.push(forms[v]);
            }
        }

        return formsbyuser;
    }

    function updateFormById(id,form){
       console.log(form);
        for( var u in forms){
            console.log(forms[u]._id+"asda"+id);
            if(forms[u]._id===id) {
                forms[u]=form;
                break;
            }
        }

        return null;
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

    function createFieldForForm(formId,field){
        var index=0;
        for( var u in forms){
            if(forms[u]._id===formId){
                break;
            }
            index++;
        }
        forms[u].fields.push(field);
        console.log(forms);
        return null;
    }

    function updateField(formId,fieldId,field){
        var index=0;
        var findex=0;
        for( var u in forms){
            if(forms[u]._id===formId){
                break;
            }
            index++;
        }

        for(var v in forms[index].fields){
            if(forms[index].fields[v]._id===fieldId){
                break;
            }
            findex++;
        }
        forms[u].fields[findex]=field;
        return null;
    }

    function deleteFieldById(formId,fieldId){

        var index=0;
        var findex=0;
        for( var u in forms){
            if(forms[u]._id===formId){
                break;
            }
            index++;
        }

        for(var v in forms[index].fields){
            if(forms[index].fields[v]._id===fieldId){
                break;
            }
            findex++;
        }

        forms[index].fields.splice(findex,1);
        console.log("deleting field");
        console.log(forms[index].fields);
        return null;

    }


}
