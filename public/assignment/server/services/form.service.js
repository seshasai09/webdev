module.exports = function(app,model){

    app.get("/api/assignment/user/:userId/form",findAllFormsForUser);
    app.get("/api/assignment/form/:formId",findFormById);
    app.delete("/api/assignment/form/:formId",deleteFormById);
    app.post("/api/assignment/user/:userId/form",createForm);
    app.put("/api/assignment/form/:formId",updateForm);
    var uuid = require('uuid');


    function findAllFormsForUser(req,res){
        var id = req.params["userId"];
        console.log("ftching form for user");
        console.log(id);
        var forms =[];
        forms=model.findAllFormsForUser(id);
        console.log(forms);
        res.json(forms);

    }
    function findFormById(req,res){
    var id = req.body;
        var form = model.findFormById(id);
        res.json(form);
    }
    function deleteFormById(req,res){
        var id = req.params["formId"];
        model.deleteFormById(id);
        res.json(200);
    }
    function createForm(req,res){
        var form=req.body;
        form._id=uuid.v1();
console.log("adding form");
        console.log(form);
        model.createFormForUser(form);
        res.send(200);
    }
    function updateForm(req,res){
        var id =req.params["formId"];
        var form ={};
        form=  req.body;
        console.log("form iid is"+id)
        console.log(form);
        model.updateFormById(id,form);
        res.send(200);
    }



}