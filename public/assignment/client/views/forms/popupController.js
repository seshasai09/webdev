(function(){

    angular.module('FormBuilderApp').
    controller('PopupInstanceController',PopupInstanceController);



            function PopupInstanceController($scope,$modalInstance,field) {
                var vm =this;
                vm.ok =ok;
                vm.close=close;
                vm.type=field.type;
                vm.field=field;
                console.log("in popup controller "+type);
               var str="";
                for(var v  in field.options){
                    str=str+field.options[v].label+":"+field.options[v].value+"\n";
                }
                vm.options=str;

                function close() {
                    $modalInstance.dismiss('cancel');
                }

                function ok(){

                    if(vm.type=="CHECKBOX"||vm.type=="OPTIONS"||vm.type=="RADIO") {
                        var field={};
                        var optionsList = vm.options.split("\n");
                        var options = new Array();
                        for(var v in optionsList) {
                            var str = optionsList[v].split(":");
                            option = {
                                label: str[0],
                                value: str[1]
                            };
                            options.push(option);
                        }
                            field = {
                                label: vm.field.label,
                                options: options
                            }


                    }else if(vm.type=="TEXT"||vm.type=="TEXTAREA") {
                        console.log(vm.field);
                         field = {
                            label: vm.field.label,
                            placeholder: vm.field.placeholder
                        };
                    }else{
                        field={
                            label:vm.field.label
                        }
                    }
                    $modalInstance.close(field);
                }


            }


})();

