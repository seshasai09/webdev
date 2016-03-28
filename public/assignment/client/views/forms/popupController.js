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

                function close() {
                    $modalInstance.dismiss('cancel');
                }

                function ok(){

                    if(vm.type=="CHECKBOX"||vm.type=="OPTIONS"||vm.type=="RADIO") {
                        var field={};
                        var options = vm.field.options.split(/\r?\n/);
                         field = {
                            label: vm.field.label,
                            options: options

                        };
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

