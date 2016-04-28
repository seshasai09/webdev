(function(){
    angular.module('MSocialApp')
        .factory('DiscussionService',DiscussionService);

    function DiscussionService($http){
        var api ={
            getAllDiscussions : getAllDiscussions,
            createDiscussion : createDiscussion,
            deleteDiscussion : deleteDiscussion,
            viewDiscussion : viewDiscussion,
            getDiscussion: getDiscussion,
            comment: comment,
            likeComment:likeComment
        };

        return api;

        function createDiscussion(artistId,discussion){
            return $http.post('/api/project/artist/discussion/'+artistId,discussion);
        }

        function viewDiscussion(artistId,postId){
            return $http.delete("/api/project/artist/"+artistId+"/post/"+postId+"");

        }
        function deleteDiscussion(artistId,discussionId){
            console.log("delete discussion");
            return $http.delete("/api/project/artist/"+artistId+"/discussion/"+discussionId+"");

        }
        function getAllDiscussions(){
            return $http.get("/api/project/artist/discussion");

        }

        function getDiscussion(artistId,discussionId){
            console.log("delete discussion");
            return $http.get("/api/project/artist/"+artistId+"/discussion/"+discussionId+"");

        }

        function comment(artistId,discussionId,comment){
            return $http.post("/api/project/artist/"+artistId+"/discussion/"+discussionId+"",comment);
        }

        function likeComment(artistId,discussionId,userId,commentId){
            console.log(artistId,discussionId,userId,commentId);
            return $http.get("/api/project/artist/"+artistId+"/discussion/"+discussionId+"/user/"+userId+"/commentlike/"+commentId);
        }


    }
})();