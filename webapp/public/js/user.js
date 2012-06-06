define(["localstorage", "socket"], function(localstorage, socket) {
    /**
     * Definition of the User class
     */
    var User = function(values) {
        values = values || {};
        this.id = values.id;
        this.username = values.username;
        this.email = values.email;
    };

    /**
     * The user that is currently logged in for this session
     */
    var _currentUser = undefined;

    var _userSocket = new socket.Socket("users");

    /**
     * Load the user that is currently saved in the session
     * @param callback Callback to trigger with the loaded user, or if the
     * user cannot be loaded for some reason
     */
    function load(callback) {
        if (_currentUser) {
            callback(null, _currentUser);
        }
        else {
            var userid = localstorage.get("userid");
            if (userid) {
                _userSocket.call("retrieveUserById", userid, function(reply) {
                    callback(reply.replyData.error, new User(reply.replyData.user));
                });
            }
            else {
                callback("No UserID found");
            }
        }
    }

    return {
        User: User,
        load: load
    };
});
