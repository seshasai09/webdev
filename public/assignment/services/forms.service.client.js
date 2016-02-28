(function(){
    angular.module('FormBuilderApp')
        .factory('FormService',FormService);

    function FormService(){

        var forms =[
            {"_id": "000", "title": "Contacts", "userId": 123},
            {"_id": "010", "title": "ToDo",     "userId": 123},
            {"_id": "020", "title": "CDs",      "userId": 234},
        ];

        return {
            createFormForUser: createFormForUser,
            findAllFormsForUser: findAllFormsForUser,
            deleteFormById: deleteFormById,
            updateFormById: updateFormById
        }



        function createFormForUser(userId, form, callback){

            form._id=(new Date).getTime();
            forms.push(form);
            callback(forms);

        }
        function findAllFormsForUser(userId, callback){
            var user_forms=[];

            for(var f in forms)
            {
                if(forms[f].userId == userId )
                {
                    console.log(forms[f]);
                    user_forms.push(forms[f]);
                }
            }
            callback(user_forms);

        }
        function deleteFormById(formId, callback){
            var index=-1;
            console.log("updating formis is "+formId);
            for(f in forms){
                index++;
                if(forms[f]._id==formId){
                    break;
                }
                 }
            forms.splice(index,1);
        }

        function updateFormById(formId, newForm, callback){
            var index=-1;
            console.log("updating formis is "+formId);
            for(f in forms){
                index++;
                console.log("in for loop"+forms[f]._id);
                if(forms[f]._id==formId){
                    break;
                }
            }
            forms[index]=newForm;
            callback(forms);
        }

    }
})();