(function(){


    angular.module('FormBuilderApp')
        .controller('HeaderController',HeaderController);

    function HeaderController($scope,$rootScope,$location){
        $scope.logout=logout;

        function logout(){
            $rootScope.user=null;
            console.log("logout"+ $rootScope.user);
            $location.path('/home');
        }
    }
})();
