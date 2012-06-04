YUI.add("webmud-views-loginpanel", function(Y) {
    /**
     * Widget representing the panel that the user enters their username into
     */
    Y.namespace("WebMud.Views.Login").LoginPanel = Y.Base.create(
        "loginPanel",
        Y.Widget,
        [Y.MakeNode],
        {
            /**
             * Set up any event bindings necessary to keep the UI in sync
             */
            bindUI: function() {
                this.after("visibleChange", this._setFocus, this);
            },

            /**
             * Callback when the Signin button is pressed. Fires an event out of this widget if an actual username was entered
             */
            _afterSignIn: function() {
                var usernameBox = this._usernameNode,
                    usernameValue = usernameBox.get("value");

                if (Y.Lang.isString(usernameValue) && usernameValue != "") {
                    this.fire("signin", {
                        username: usernameValue
                    });
                }
            },
            /**
             * Update the focus when the panel is displayed, putting focus into the email field
             */
            _setFocus: function() {
                if (this.get("visible")) {
                    this.focus();
                }
            },
            /**
             * Actually give the Username box the focus
             */
            focus: function() {
                this._usernameNode.focus();
            }
        }, {
            /** Template used to render the widget */
            _TEMPLATE: [
                '<label>Username: <input class="{c username}" type="text" /></label>',
                '<div>',
                    '<button class="{c signin}">Sign In</button>',
                '</div>',
            ].join(""),
            /** Class names used by the widget */
            _CLASS_NAMES: [
                "username",
                "signin"
            ],
            /** DOM events handled by the widget */
            _EVENTS: {
                signin: [{
                    type: "click",
                    fn: "_afterSignIn"
                }]
            },
            ATTRS: {
            }
        });
}, "0.0.1", {
    requires: [
        "widget",
        "gallery-makenode"
    ]
});

