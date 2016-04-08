module.exports = function(){
    var mock= require("./user.mock.json"); // local instance to refrence the data
    var api= {
        findUserByCredentials: findUserByCredentials,
        createUser: createUser
    };

    return api;

    function findUserByCredentials(user){

        console.log("in model of server "+user);
       // console.log(require("./user.mock.json"));
        for( var u in mock){
            if(mock[u].username===user.username && mock[u].password==user.password) {
                return mock[u];
            }
        }
        return null;
    }

    function createUser(user){
        user._id = "ID_"+(new Date()).getTime();
        mock.push(user);
        return user;
    }
}