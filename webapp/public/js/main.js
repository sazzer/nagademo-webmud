YUI().use("webmud-socketio", "webmud-user", function(Y) {
    var socket = new Y.WebMud.Socket();

    var user = new Y.WebMud.User({id: 123});
    user.load(function(err) {
        if (err) {
            Y.log("Error retrieving user details: " + err);
        }
        Y.log("Retrieved user: " + user.get("username"));
    });
});
