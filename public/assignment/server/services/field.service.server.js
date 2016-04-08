module.exports = function(app,Formmodel){

    app.get("/api/assignment/form/:formId/field",getFieldsForForm);
    app.get("/api/assignment/form/:formId/field/:fieldId",findFieldById);
    app.delete("/api/assignment/form/:formId/field/:fieldId",deleteFieldById);
    app.post("/api/assignment/form/:formId/field",createFieldForForm);
    app.put("/api/assignment/form/:formId/field/:fieldId",updateField);
    app.put("/api/assignment/form/:formId/field", updateFields);
    var uuid = require('uuid');

    var model = require('../model/field.model.js')(Formmodel);


    function updateFields (req, res) {
        var formId = req.params.formId;
        var startIndex = req.query.startIndex;
        var endIndex = req.query.endIndex;
        console.log("sorting fields");
        console.log(startIndex);
        console.log(endIndex);

        if(startIndex && endIndex) {
            model
                .sortField(formId, startIndex, endIndex)
                .then(
                    function(stat) {
                        return res.json(200);
                    },
                    function(err) {
                        console.log(err);
                        res.status(400).send(err);
                    }
                );
        }
    }



    function  getFieldsForForm(req,res){
        var id = req.params["formId"];
        var forms=model.findFieldsForForms(id)
            .then(function(form){
                console.log("fields RE");
                console.log(form);
                res.json(form.fields);
            },function(err){
                res.status(400).send(err);
            });

    }

    function findFieldById(req,res){

    }
    function deleteFieldById(req,res){
        var formId = req.params["formId"];
        var fieldId = req.params["fieldId"];
        model.deleteFieldById(formId,fieldId)
            .then(function(data){
                res.send(200);
            },function(err){
                res.status(400).send(err);
            })


    }
    function createFieldForForm(req,res){
        var formId = req.params["formId"];
        var field = req.body;
        console.log("field is ");
        console.log(field);
      //  field._id=uuid.v1();
        model.createFieldForForm(formId,field)
            .then(function(data){
                res.json(data.fields);
            },function(err){
                res.status(400).send(err);
            });


    }
    function updateField(req,res){
        var formId = req.params["formId"];
        var fieldId = req.params["fieldId"];
        var field = req.body;
        console.log("just before update");
        console.log(field);
        model.updateField(formId,fieldId,field)
            .then(function(data){
                console.log(data);
                res.send(200);
            },function(err){
                console.log(err);
                res.status(400).send(err);
            });
    }


}