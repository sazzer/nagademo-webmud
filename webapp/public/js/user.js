define(["localstorage", "socket", "radio"], function(localstorage, socket, radio) {
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

    /**
     * The Socket connection to load user data with
     */
    var _userSocket = new socket.Socket("users");

    /**
     * The User Loaded event
     */
    var _userLoadedEvent = radio("users/loaded");

    /**
     * Load the user that is currently saved in the session
     * @param callback Callback to trigger with the loaded user, or if the
     * user cannot be loaded for some reason
     */
    function load(callback) {
        if (_currentUser) {
            _userLoadedEvent.broadcast(_currentUser);
            callback(null, _currentUser);
        }
        else {
            var userid = localstorage.get("userid");
            if (userid) {
                _userSocket.call("retrieveUserById", userid, function(reply) {
                    _currentUser = new User(reply.replyData.user);
                    _userLoadedEvent.broadcast(_currentUser);
                    callback(reply.replyData.error, _currentUser);
                });
            }
            else {
                _userLoadedEvent.broadcast(undefined);
                callback("No UserID found");
            }
        }
    }

    return {
        User: User,
        load: load,
        events: {
            loaded: _userLoadedEvent
        }
    };
});
