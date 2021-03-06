(function(){
    angular.module('FormBuilderApp')
        .controller('FieldController',FieldController);

    function FieldController($routeParams,FieldService,$modal){

        var vm = this;
        vm.addField=addField;
        vm.edit=edit;
        vm.add=add;
        vm.remove=remove;
        vm.sortField=sortField;
   //     vm.sort=sort;
        init();

        function init(){
            var formId =$routeParams.formId;
            vm.fieldType=" ";
            FieldService.getFieldsForForm(formId)
                .then(function(response){
                    vm.fields = response.data;
                });
        }

        function addField(type) {
            var field={};
            switch(type){
                case "TEXT": field={
                    label:"New Text Field",
                    type: "TEXT",
                    placeholder: "New Field"
                };
                    break;
                case "TEXTAREA": field={
                    label:"New TextArea Field",
                    type: "TEXTAREA",
                    placeholder: "New Field"
                };
                    break;
                case "DATE": field={
                    label:"New Date Field",
                    type: "DATE"
                };
                    break;
                case "OPTIONS": field={
                    label:"New Dropdown",
                    type: "OPTIONS",
                    options: [
                        {label:"Option 1", value:"OPTION_1"},
                        {label:"Option 2", value:"OPTION_2"},
                        {label:"Option 3", value:"OPTION_3"}
                    ]
                };
                    break;
                case "CHECKBOX": field={
                    label:"New Checkboxes",
                    type: "CHECKBOX",
                    options: [
                        {label:"Option A", value:"OPTION_A"},
                        {label:"Option B", value:"OPTION_B"},
                        {label:"Option C", value:"OPTION_C"}
                    ]
                };
                    break;
                case "RADIO": field={
                    label:"New Radio Buttons",
                    type: "RADIO",
                    options: [
                        {label:"Option X", value:"OPTION_X"},
                        {label:"Option Y", value:"OPTION_Y"},
                        {label:"Option Z", value:"OPTION_Z"}
                    ]
                };
                    break;
            }
            var formId =$routeParams.formId;
            console.log(field);
            FieldService.createFieldForForm(formId,field)
                .then(function(response){
                    init();
                });
        }

        function edit(fieldIndex) {
            var formId =$routeParams.formId;
            console.log("in edit");
        var type = vm.fields[fieldIndex].type;
                var modalInstance = $modal.open({
                    templateUrl: "views/forms/test.html",
                    controller:'PopupInstanceController',
                    controllerAs: "model",
                    windowClass: 'app-modal-window',
                    resolve:{
                        field:function(){
                            return vm.fields[fieldIndex];
                            }
                    }
                });

           modalInstance.result.then(function(result){
               var field=null;
               if(type=="CHECKBOX"||type=="OPTIONS"||type=="RADIO") {
                   vm.fields[fieldIndex].label = result.label;
                   var data=[];
                   var temp=null;
                   vm.fields[fieldIndex].options=result.options;

               }else if(type=="TEXT"||type=="TEXTAREA") {
                   vm.fields[fieldIndex].label = result.label;
                   vm.fields[fieldIndex].placeholder = result.placeholder;
               }else{
                   vm.fields[fieldIndex].label = result.label;
               }
               field= vm.fields[fieldIndex];
               console.log(field);
               FieldService.updateField(formId,vm.fields[fieldIndex]._id,field)
                   .then(function(response){
                       init();
                   });
           });

        }

        function add(fieldIndex) {
            var formId =$routeParams.formId;
          //  console.log("in edit");
            var field = {};
            field=vm.fields[fieldIndex];

            FieldService.createFieldForForm(formId,field)
                .then(function(response){
                    init();
                });
        }

        function remove(fieldIndex) {
            var formId =$routeParams.formId;
           var  fieldId=vm.fields[fieldIndex]._id;

            FieldService.deleteFieldFromForm(formId,fieldId)
                .then(function(response){
                    init();
                });
        }

        function updateField(formId, fieldId, field) {
            return $http.get();
        }

       /* setTimeout(function(){
            $(".sortable").sortable({
                connectWith: ".sortable",
                handle: ".move",
            }).disableSelection();
        });*/

        function sortField(start,end){
            console.log("in sorting");
            FieldService
                .sortField($routeParams.formId,start,end)
                .then(
                    function (response) {
                    },
                    function (err) {
                        vm.error = err;
                        console.log(err);
                    }
                );
                }

    }

})();