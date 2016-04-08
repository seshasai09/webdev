module.exports = function(app,model){

    app.get("/api/assignment/user/:userId/form",findAllFormsForUser);
    app.get("/api/assignment/form/:formId",findFormById);
    app.delete("/api/assignment/form/:formId",deleteFormById);
    app.post("/api/assignment/user/:userId/form",createForm);
    app.put("/api/assignment/form/:formId",updateForm);
    var uuid = require('uuid');


    function findAllFormsForUser(req,res){
        var id = req.params["userId"];
        model.findAllFormsForUser(id)
            .then(function(forms){
                res.json(forms);
            },function(err){
                res.status(400).send(err);
            });

    }
    function findFormById(req,res){
    var id = req.params["formId"];;
        model.findFormById(id)
            .then(function(form){
                res.json(form);
            },function(err){
                res.status(400).send(err);
            });

    }
    function deleteFormById(req,res){
        var id = req.params["formId"];
        model.deleteFormById(id)
            .then(function(data){
                res.json(200);
            },function(err){
                res.status(400).send(err);
            });

    }
    function createForm(req,res){
        var form=req.body;
   //     form._id=uuid.v1()

        var user=req.body;
        // user._id=uuid.v1();
        model.createFormForUser(form)
            .then(function(form){
                res.send(200);
            },function(err){
                if(err){
                    res.status(400).send(err);
                }
            });
    }

    function updateForm(req,res){
        var id =req.params["formId"];
        var form ={};
        form=  req.body;
        model.updateFormById(id,form)
            .then(function(data){
                res.send(200);
            },function(err){
                res.status(400).send(err);
            });

    }



}