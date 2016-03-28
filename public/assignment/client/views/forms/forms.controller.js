(function(){
    angular.module('FormBuilderApp')
        .controller('FormController',FormController);

    function FormController($scope,FormService,$rootScope,UserService) {

        var selectedIndex=null;
        var vm = this;
        vm.findUserForms=findUserForms;
        vm.addForm = addForm;
        vm.updateForm = updateForm;
        vm.selectForm = selectForm;
        vm.deleteForm=deleteForm;

        init();
        function init(){
            console.log("fetching the forms");
            findUserForms();
        }

        function findUserForms(){
            console.log("all forms for user");
            var user = null;
            UserService.getCurrentUser()
                .then(function(response){
                    FormService.findAllFormsForUser(response.data._id)
                        .then(function(response){
                            vm.user_forms=response.data;
                        });
                });



        }




        function addForm() {
            var user=UserService.getLoggedInUser();


            console.log(user);
            var nform={
                title:vm.newform.title,
                userId:user._id};
                FormService.createFormForUser(user._id, nform)
                    .then(function (reponse) {
                    findUserForms();
            });
            vm.newform={};
        }

        function updateForm() {
            console.log("selected index ="+selectedIndex)
            var uform = vm.user_forms[selectedIndex];
            console.log(uform);
            var nform={
                _id:uform.id,
                title:vm.newform.title,
                userId:uform.userId};
            FormService.updateFormById(uform._id, nform)
                .then( function () {
                    findUserForms();
            });
            vm.newform={};
        }

         function selectForm(index){
             selectedIndex=index;
            vm.newform = {title:vm.user_forms[index].title};
        }

         function deleteForm(index) {
            FormService.deleteFormById(vm.user_forms[index]._id)
                .then(function () {
                    findUserForms();
            });
        }




        }
    })();

