(function(){
    angular.module("FormBuilderApp")
        .controller('SidebarController ',SidebarController );
    function SidebarController($scope){
        $scope.hello="hello world";
    }
})();
