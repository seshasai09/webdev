(function(){
    angular.module("MSocialApp")
        .controller('SidebarController ',SidebarController );
    function SidebarController($scope){
        $scope.hello="hello world";
    }
})();
