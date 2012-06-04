YUI.add("webmud-app", function(Y) {
    /**
     * Simple App extension to handle the views
     */
    Y.namespace("WebMud").App = Y.Base.create(
        "app",
        Y.App,
        [],
        {
            /**
             * The views that we use for the entire app
             */
            views: {
                "login": {
                    type: Y.WebMud.Views.LoginView
                }
            },
            /**
             * Ensure that the correct initial view is displayed
             */
            initializer: function() {
                this.once("ready", function(e) {
                    Y.log("Showing view: login");
                    this.showView("login");
                });
            }
        }, {
            ATTRS: {
                socket: {
                    value: new Y.WebMud.Socket()
                },
                user: {
                    value: new Y.WebMud.User()
                }
            }
        });
}, "0.0.1", {
    requires: [
        "app",
        "webmud-socketio",
        "webmud-user",
        "webmud-views-login"
    ]
});
