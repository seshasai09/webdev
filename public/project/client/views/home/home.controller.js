/**
 * Created by vasumathi on 25/02/2016.
 */
(function(){
    angular.module('MSocialApp')
        .controller('homecontroller',homecontroller);

    function homecontroller(UserService,PostService){
        var vm = this;
        vm.post = post;
        vm.deletePost = deletePost;
        vm.likePost = likePost;
        //console.log(UserService.getCurrentUser());
        //$scope.user=UserService.getCurrentUser().firstName;

        init();

        function init(){

        }

        function post(){
            console.log("in post")
            var user = null;
                UserService.getCurrentUser()
                    .then(function(response){
                        console.log(response.data);
                        user = response.data;
                    },function(err){
                        console.log(err);
                    })
                    .then(function(){
                        UserService.post(user._id,{content:vm.post.data})
                            .then(function(response){
                                console.log("posts");
                                console.log(response.data);
                                vm.posts = response.data;
                            },function(err){
                                console.log(err);
                            });
                    });
        }

        function deletePost(postId){
            console.log(postId);
            UserService.getCurrentUser()
                .then(function(response){
                    console.log(response.data);
                    user = response.data;
                },function(err){
                    console.log(err);
                })
                .then(function(){
                    PostService.deletePost(user._id,postId)
                        .then(function(response){
                            console.log("posts");
                            console.log(response.data);
                            vm.posts = response.data;
                        },function(err){
                            console.log(err);
                        });
                });
        }


        function likePost(postId){
            console.log(postId);
            UserService.getCurrentUser()
                .then(function(response){
                    console.log(response.data);
                    user = response.data;
                },function(err){
                    console.log(err);
                })
                .then(function(){
                    PostService.likePost(user._id,postId)
                        .then(function(response){
                            vm.posts = response.data;
                        },function(err){
                            console.log(err);
                        });
                });
        }


    }

})();
