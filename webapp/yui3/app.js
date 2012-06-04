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
                this.once("ready", this._onReady, this);
                this.get("user").after("load", this._afterUserLoaded, this);
            },
            /**
             * Event handler for when the app is ready to start
             */
            _onReady: function() {
                var user = this.get("user");
                user.load(Y.bind(function(err) {
                    if (err) {
                        Y.log(err);
                        this.showView("login", {}, Y.bind(function(v) {
                            v.after("loggedin", function(e) {
                                var userid = e.user.userid;
                                Y.log("User logged in. Storing user id: " + userid);
                                user.set("id", userid);
                                user.load();
                            });
                        }, this));
                    }
                }, this));
            },
            /**
             * Handler for when the user is successfully loaded
             */
            _afterUserLoaded: function() {
                var user = this.get("user");
                Y.log("User loaded: " + user.get("username"));
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
