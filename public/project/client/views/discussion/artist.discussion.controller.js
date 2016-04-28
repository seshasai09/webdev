(function(){
    angular.module('MSocialApp')
        .controller('DiscussionController',DiscussionController);


    function DiscussionController (DiscussionService,UserService,$location,$routeParams){

        var vm = this;
        vm.discussions=null;

        vm.createDiscussion = createDiscussion;
        vm.deleteDiscussion = deleteDiscussion;
        vm.viewDiscussion = viewDiscussion;
        vm.navigate = navigate;
        vm.comment = comment;
        vm.likeComment = likeComment;

        function init(){
            if($routeParams.discussionId!=undefined){
               /* DiscussionService.getDiscussion()
                    .then(function(response){

                    })*/

                UserService.getCurrentUser()
                    .then(function(response){
                        console.log(response.data);
                        vm.user = response.data;
                    },function(err){
                        console.log(err);
                    })
                    .then(function(){
                        DiscussionService.getDiscussion($routeParams.artistId,$routeParams.discussionId)
                            .then(function(response){
                                console.log(response);
                                vm.discussion = response.data;
                            });

                    });
            }
            var dis = new Array();
            UserService.getCurrentUser()
                .then(function(response){
                    console.log(response.data);
                    vm.user = response.data;
                    DiscussionService.getAllDiscussions()
                        .then(function(response){
                            console.log(response);
                            for(var v in response.data){
                                for(var u in response.data[v]){
                                    dis.push(response.data[v][u]);
                                }
                            }
                            console.log(dis);
                            vm.discussions =dis;
                        });
                },function(err){
                    console.log(err);
                });

        }

        init();

        function createDiscussion(){
            var Discussion ={
                name : vm.newdiscussion.name,
                description : vm.newdiscussion.description
            }
            UserService.getCurrentUser()
                .then(function(response){
                    console.log(response.data);
                    vm.user = response.data;
                },function(err){
                    console.log(err);
                })
                .then(function(){
                    DiscussionService.createDiscussion(vm.user._id,Discussion)
                        .then(function(response){
                            console.log(response);
                            vm.discussions = response.data;
                        });

                });
            vm.newdiscussion = null;

        }

        function deleteDiscussion(discussionId){
            UserService.getCurrentUser()
                .then(function(response){
                    vm.user = response.data;
                },function(err){
                    console.log(err);
                })
                .then(function(){
                    DiscussionService.deleteDiscussion(vm.user._id,discussionId)
                        .then(function(response){
                            console.log(response);
                            vm.discussions = response.data;
                        });

                });
            DiscussionService.deleteDiscussion();
        }

        function viewDiscussion(){
            DiscussionService.getAllDiscussions();
        }

        function navigate(id,createdby){
            console.log("created by");
            console.log(createdby);
            $location.path('/viewdiscussion/'+createdby+'/discussion/'+id);
        }

        function comment(){

          //  console.log(comm);
            UserService.getCurrentUser()
                .then(function(response){
                    console.log(response.data);
                    vm.user = response.data;
                    var comm = {
                        content:vm.newcomment,
                        createdBy: vm.user.username,
                        likes: []
                    };
                    DiscussionService.comment($routeParams.artistId,$routeParams.discussionId,comm)
                        .then(function(response){
                            vm.newcomment="";
                            vm.discussion = response.data;
                            //   $location.path('/viewdiscussion/'+$routeParams.discussionId+'');
                        })
                },function(err){
                    console.log(err);
                })
                .then(function(){
                   /* DiscussionService.comment($routeParams.artistId,$routeParams.discussionId,comm)
                        .then(function(response){
                            console.log("after comment the discussion");
                            console.log(response);
                            console.log(response);
                            vm.discussion = response.data;
                         //   $location.path('/viewdiscussion/'+$routeParams.discussionId+'');
                        });*/

                });

        }

        function likeComment(commentId){
            console.log(commentId);
            DiscussionService.likeComment($routeParams.artistId,$routeParams.discussionId,vm.user._id,commentId)
                .then(function(response){
                    console.log(response);
                    DiscussionService.getDiscussion($routeParams.artistId,$routeParams.discussionId)
                        .then(function(response){
                            console.log(response);
                            vm.discussion = response.data;
                        });
                });
        }

    }
})();