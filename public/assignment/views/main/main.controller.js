(function(){
    angular.module('FormBuilderApp')
        .controller('MainController', function ($scope,$rootScope,$location){

            console.log("in main controller:  " + $location.url());

            $scope.$location=$location;
        });


})();