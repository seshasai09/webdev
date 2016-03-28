module.exports = function(app,model){

    app.get("/api/assignment/form/:formId/field",getFieldsForForm);
    app.get("/api/assignment/form/:formId/field/:fieldId",findFieldById);
    app.delete("/api/assignment/form/:formId/field/:fieldId",deleteFieldById);
    app.post("/api/assignment/form/:formId/field",createFieldForForm);
    app.put("/api/assignment/form/:formId/field/:fieldId",updateField);
    var uuid = require('uuid');



    function  getFieldsForForm(req,res){
        var id = req.params["formId"];
        var forms=model.findFieldsForForms(id);
        res.json(forms);
    }

    function findFieldById(req,res){

    }
    function deleteFieldById(req,res){
        var formId = req.params["formId"];
        var fieldId = req.params["fieldId"];
        model.deleteFieldById(formId,fieldId);
        res.send(200);

    }
    function createFieldForForm(req,res){
        var formId = req.params["formId"];
        var field = req.body;
        field._id=uuid.v1();
        model.createFieldForForm(formId,field);
        res.send(200);

    }
    function updateField(req,res){
        var formId = req.params["formId"];
        var fieldId = req.params["fieldId"];
        var field = req.body;
        console.log("just before update");
        console.log(field);
        model.updateField(formId,fieldId,field);
        res.send(200);

    }


}