    (function() {
        angular.module('FormBuilderApp')
            .controller('searchVideosController', searchVideosController);

        function searchVideosController($scope,$rootScope,$http,$window) {

            $scope.search=function() {
                console.log($scope.query);
                $http.get("https://www.googleapis.com/youtube/v3/search?" +
                        "part=snippet&maxResults=20&q="+$scope.query+"&key=AIzaSyB7YeeEELe9QqFywdSw_5UUvD7-VIOAJwM")
                    .then(function (response) {
                      //  console.log(response);
                        $scope.tracks = response.data.items;
                    });
            }

            $scope.openVideo=function(id){
                console.log("ascasd"+id);
                $window.open('https://www.youtube.com/watch?v='+id);
            }



        }
    })();