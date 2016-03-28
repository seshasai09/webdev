(function(){
    angular.module('MSocialApp')
        .controller('MainController', function ($scope,$rootScope,$location){

            console.log("in main controller:  " + $location.url());

            $scope.$location=$location;
        });


})();