YUI.add("webmud-views-currentuser", function(Y) {
    /**
     * Widget that maintains the Current User area in the top of the screen
     */
    Y.namespace("WebMud.Views").CurrentUser = Y.Base.create(
        "currentUser",
        Y.Widget,
        [Y.MakeNode],
        {
            /**
             * Bind events so that when the user gets loaded the widget knows about it
             */
            bindUI: function() {
                this.get("user").after("load", this._userLoaded, this);
            },
            /**
             * Handle initial synchronization of the widget
             */
            syncUI: function() {
                this._userLoaded();
            },
            /**
             * Handler to ensure the user is displayed correctly
             */
            _userLoaded: function() {
                var user = this.get("user");
                
                if (!user.isNew()) {
                    Y.log("Showing current user");
                    this._usernameNode.set("text", user.get("username"));
                    this.show();
                }
                else {
                    Y.log("Hiding current user");
                    this.hide();
                }
            },
            /**
             * Handler for when the Logout link is clicked
             */
            _afterLogoutClick: function() {
                this.get("user").destroy();
            },
            /**
             * Handler for when the Username link is clicked
             */
            _afterUsernameClick: function() {
            }
        }, {
            _TEMPLATE: [
                '<div class="{c loggedin}">',
                    'Welcome <span class="{c username}"></span>',
                    ' | <span class="{c logout}">Log out</span>',
                '</div>'
            ].join(""),
            _CLASS_NAMES: [
                "loggedin",
                "username",
                "logout"
            ],
            _EVENTS: {
                "logout": ["click"],
                "username": ["click"]
            },
            ATTRS: {
                user: {}
            }
        });
}, "0.0.1", {
    requires: [
        "base",
        "widget",
        "gallery-makenode"
    ]
});



