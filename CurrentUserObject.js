/**
 * Created by Matt on 4/30/2016.
 */

//function currentUser(userObj)
//{
//    this.currUser = userObj;
//    this.currUserName = userObj.getUserName();
//    this.currUserPassword = userObj.getPassword();
//
//    this.getCurrentUserName = function()
//    {
//        return this.currUserName;
//    };
//
//    this.getCurrentUserPassword = function()
//    {
//        return this.currUserPassword;
//    }
//}


//I'm trying to make a singleton and failing I think. Idk javascript syntax...
var currentUserSingleton =
{
    //Default this current user to guest in init.d when the OS starts

    //initializes the instance of currentUser.
    createInstance: function ()
    {
        this.currentUser = new User("Guest", "Password");
    },

    //So only one instance of current user is available at any time.
    getInstance: function ()
    {
        if(this.currentUser != undefined)
        {
            this.currentUser = this.createInstance();
        }

        return this.currentUser;
    },
    
    //So we can change who the current user is.
    setInstance: function(userObj)
    {
        this.currentUser = userObj;
    }
};
