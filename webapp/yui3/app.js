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
                },
                "characters": {
                    type: Y.WebMud.Views.CharactersView
                },
                "newCharacter": {
                    type: Y.WebMud.Views.NewCharacterView
                }
            },
            /**
             * Ensure that the correct initial view is displayed
             */
            initializer: function() {
                var user = this.get("user");

                this.once("ready", this._onReady, this);
                user.after("load", this._afterUserLoaded, this);
                user.after("destroy", function() {
                    location.reload(true);
                });
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

                var currentUser = new Y.WebMud.Views.CurrentUser({
                    user: user,
                    render: "#header"
                }).hide();
                this.set("currentUserArea", currentUser);
            },
            /**
             * Handler for when the user is successfully loaded
             */
            _afterUserLoaded: function() {
                var user = this.get("user"),
                    characters = this.get("characters");

                characters.set("user", user);
                characters.load(Y.bind(function(err, response) {
                    if (characters.isEmpty()) {
                        this.showView("newCharacter");
                    }
                    else {
                        this.showView("characters", {characters: characters});
                    }
                }, this));
            }
        }, {
            ATTRS: {
                socket: {
                    value: new Y.WebMud.Socket()
                },
                user: {
                    value: new Y.WebMud.User()
                },
                characters: {
                    value: new Y.WebMud.CharacterList()
                },
                currentUserArea: {}
            }
        });
}, "0.0.1", {
    requires: [
        "app",
        "webmud-socketio",
        "webmud-user",
        "webmud-character-list",
        "webmud-views-login",
        "webmud-views-characters",
        "webmud-views-newcharacter",
        "webmud-views-currentuser"
    ]
});
