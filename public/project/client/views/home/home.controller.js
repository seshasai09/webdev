/**
 * Created by vasumathi on 25/02/2016.
 */
(function(){
    angular.module('MSocialApp')
        .controller('homecontroller',homecontroller);

    function homecontroller(UserService,ArtistService,PostService){
        var vm = this;
        vm.post = post;
        vm.deletePost = deletePost;
        vm.likePost = likePost;
      //  vm.user = null;
        //console.log(UserService.getCurrentUser());
        //$scope.user=UserService.getCurrentUser().firstName;

        init();

        function init() {
            var posts = new Array();
            console.log("init");
            UserService.getCurrentUser()
                .then(function (response) {
                    console.log(response.data);
                    vm.user = response.data;
                    if (vm.user.type == "user") {
                        console.log("user type");
                        UserService.getposts(vm.user._id)
                            .then(function (response) {
                                console.log(response);
                                for (var v in response.data) {
                                    for (var u in response.data[v].posts) {
                                        var post = {
                                            image: response.data[v].image,
                                            content: response.data[v].posts[u],
                                            _id: response.data[v].posts[u]._id,
                                            like: response.data[v].posts[u].like.length,
                                            createddate:response.data[v].posts[u].createddate,
                                            type:""
                                        }
                                        posts.push(post);
                                    }
                                }
                                vm.psts = posts.sort(custom_sort);
                            }, function (err) {

                            });
                    } else {
                        UserService.getCurrentUser()
                            .then(function (response) {
                                console.log(response.data);
                                vm.user = response.data;
                                ArtistService.getPosts(vm.user._id)
                                    .then(function(response) {
                                        console.log("inside posts for artist");
                                        console.log(response);
                                        for (var u in response.data.posts) {
                                            var post = {
                                                image: response.data.imageSURL,
                                                content: response.data.posts[u].content,
                                                _id: response.data.posts[u]._id,
                                                like: response.data.posts[u].like.length,
                                                createddate:response.data.posts[u].createddate,
                                                type:""
                                            }
                                            posts.push(post);

                                      //  vm.psts = posts;
                                    }
                                        vm.psts = posts.sort(custom_sort);
                                    },function(err){

                                    } );

                            }, function (err) {
                                console.log(err);
                            });

                    }
                }, function (err) {

                });
        }


        function post(){
            console.log("in post")
          //  var user = null;
                UserService.getCurrentUser()
                    .then(function(response){
                        console.log(response.data);
                        vm.user = response.data;
                    },function(err){
                        console.log(err);
                    })
                    .then(function(){
                        UserService.post( vm.user._id,{content:vm.post.data})
                            .then(function(response){
                                console.log("posts");
                                console.log(response.data);
                                vm.post.data="";
                                vm.psts = response.data.sort(custom_sort);
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
                            vm.psts = response.data;
                        },function(err){
                            console.log(err);
                        });
                });
        }


        function likePost(userId,post){
            console.log(post);
            var posts = new Array();
            console.log(vm.user.type);
            post.type=vm.user.type;
             PostService.likePost(userId,post)
                 .then(function(response){
                     if(vm.user.type=="artist") {
                         for (var u in response.data) {
                             var post = {
                                 _id: response.data[u]._id,
                                 image: vm.user.imageSURL,
                                 content: response.data[u].content,
                                 like: response.data[u].like.length,
                                 createdBy: response.data[u].createdBy,
                                 createddate:response.data[u].createddate,
                             }
                             posts.push(post);
                         }
                         vm.psts = posts.sort(custom_sort)
                     }else{
                         UserService.getposts(vm.user._id)
                             .then(function (response) {
                                 console.log(response);
                                 for (var v in response.data) {
                                     for (var u in response.data[v].posts) {
                                         var post = {
                                             image: response.data[v].image,
                                             content: response.data[v].posts[u],
                                             _id: response.data[v].posts[u]._id,
                                             like: response.data[v].posts[u].like.length,
                                             createddate:response.data[v].posts[u].createddate,
                                             type:""

                                         }
                                         posts.push(post);
                                     }
                                 }

                                 vm.psts = posts.sort(custom_sort)
                             }, function (err) {

                             });
                     }
                   //  vm.psts = response.data;
                        },function(err){
                            console.log(err);
                        });
        }

        function custom_sort(a, b) {
      //      return new Date(b.createddate) - new Date(a.createddate);
            if (new Date(a.createddate) > new Date(b.createddate)) return -1;
            if (new Date(a.createddate) < new Date(b.createddate)) return 1;
            return 0;
        }


    }

})();
