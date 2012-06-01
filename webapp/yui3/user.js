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
                            Y.fire("socket:call", {
                                message: "user:retrieveUserById",
                                data: this.get("id"),
                                callback: function(d) {
                                    Y.log("Username: " + d.replyData.username);
                                    callback(null, d.replyData);
                                }
                            });
                        }
                        break;
                    default:
                        callback("Unsupported operation: " + action);
                        break;
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
                        return Y.StorageLite.getItem("userid");
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
