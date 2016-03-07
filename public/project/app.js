(function(){
    angular.module('FormBuilderApp',['ngRoute']);
    var myApp=angular.module('FormBuilderApp');
    myApp.config(['$httpProvider', function($httpProvider) {
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }]);

    })();

