(function(){
    angular.module('MSocialApp')
        .controller('FormController',FormController);

    function FormController($scope,FormService,$rootScope) {

        function findUserForms(){
            FormService.findAllFormsForUser($rootScope.user._id,function(user_forms){
                console.log("in forms contreoller"+user_forms);
                $scope.user_forms=user_forms;
            });
        }
        findUserForms();

        var addForm = addForm;
        var updateForm = updateForm;
        var selectForm = selectForm;

        $scope.addForm = function () {
            var nform={
                title:$scope.newform.title,
                userId:$rootScope.user._id};
                FormService.createFormForUser($rootScope.user._id, nform, function (userForms) {
                    $scope.user_forms=userForms;
            });
            findUserForms();
            $scope.newform={};
        }

        $scope.updateForm = function () {

            var uform = $scope.user_forms[$scope.selectedIndex];
            console.log(uform);
            var nform={
                _id:uform.id,
                title:$scope.newform.title,
                userId:uform.userId};
            FormService.updateFormById(uform._id, nform, function (userForms) {
                $scope.user_forms=userForms;
            });
            findUserForms();
            $scope.newform={};
        }

        $scope.selectForm = function(index){
            console.log("n select form"+index);
            $scope.selectedIndex=index;
            console.log($scope.user_forms[index].title);
            $scope.newform.title = $scope.user_forms[index].title;
        }

        $scope.deleteForm = function (index) {
            FormService.deleteFormById($scope.user_forms[index]._id, function () {

            });
            findUserForms();
        }


        }
    })();

