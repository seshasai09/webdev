(function(){
    angular.module('MSocialApp')
        .factory('PostService',PostService);

    function PostService($http){
        var api ={
            deletePost : deletePost,
            likePost:likePost
        };

        return api;

        function deletePost(artistId,postId){
            return $http.delete("/api/project/artist/"+artistId+"/post/"+postId+"");

        }

        function likePost(artistId,post){
            return $http.put("/api/project/artist/"+artistId+"/post/",post);

        }
    }
})();