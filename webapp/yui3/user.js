YUI.add("webmud-user", function(Y) {
    /**
     * Model Class that represents the User that is currently being used
     */
    Y.namespace("WebMud").User = Y.Base.create(
        "user",
        Y.Model,
        [],
        {
            /**
             * Hook up the listener so that when the User object is destroyed the user is forgotten
             */
            initializer: function() {
                this.on("destroy", this._forgetUser, this);
            },
            /**
             * Forget the user, so that next time round the user needs to log in again
             */
            _forgetUser: function() {
                Y.StorageLite.removeItem("userid");
            },
            /**
             * Custom Sync function to retrieve the User from the mud server.
             * The User is retrieved by firing an event that will be processed by
             * the Socket.IO handler to retrieve the User by it's ID, under the assumption
             * that the ID of the user is already available in the class.
             */
            sync: function(action, options, callback) {
                switch (action) {
                    case "read":
                        if (this.isNew()) {
                            callback("No UserID specified");
                        }
                        else {
                            var userid = this.get("id");
                            Y.log("User id: " + userid);
                            Y.fire("socket:call", {
                                message: "users:retrieveUserById",
                                data: userid,
                                callback: function(d) {
                                    var user = d.replyData.user;
                                    if (user) {
                                        Y.log("Username: " + user.username);
                                        callback(null, user);
                                    }
                                    else {
                                        callback("Unknown user");
                                    }
                                }
                            });
                        }
                        break;
                    default:
                        callback("Unsupported operation: " + action);
                        break;
                }
            },
            /**
             * Determine if the user is New or not. A User is New if it has no ID
             */
            isNew: function() {
                var userid = this.get("id");
                if (userid) {
                    return false;
                }
                else {
                    return true;
                }
            }
        }, {
            ATTRS: {
                /**
                 * The ID of the User as far as the Server is concerned.
                 * This is stored by the StorageLite module, which will typically
                 * store it in the HTML5 LocalStorage space
                 */
                id: {
                    valueFn: function() {
                        var userid = Y.StorageLite.getItem("userid");
                        if (userid === "undefined") {
                            userid = undefined;
                            Y.StorageLite.removeItem("userid");
                        }
                        Y.log("User ID is now: " + userid);
                        return userid;
                    },
                    setter: function(val) {
                        if (val === "undefined") {
                            val = undefined;
                        }
                        Y.log("Setting User ID to: " + val);
                        Y.StorageLite.setItem("userid", val);
                        return val;
                    }
                },
                /**
                 * The Username of the User
                 */
                username: {},
                /**
                 * The Email address of the User
                 */
                email: {}
            }
        });
}, "0.0.1", {
    requires: [
        "model",
        "gallery-model-sync-rest",
        "gallery-storage-lite"
    ]
});
