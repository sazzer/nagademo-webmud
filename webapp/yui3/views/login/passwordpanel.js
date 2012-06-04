YUI.add("webmud-views-passwordpanel", function(Y) {
    /**
     * Widget that allows the user to enter their password for their accout
     */
    Y.namespace("WebMud.Views.Login").PasswordPanel = Y.Base.create(
        "passwordPanel",
        Y.Widget,
        [Y.MakeNode],
        {
            /**
             * Set up any event bindings necessary to keep the UI in sync
             */
            bindUI: function() {
                this.after("visibleChange", this._setFocus, this);
                this.after("errorsChange", this._updateErrors, this);
            },

            /**
             * Update the value displayed in the Username field
             * @param value {String} The value being set
             * @param src {String} The source of the call
             */
            _uiSetUsername: function(value, src) {
                if (src === "ui") {
                    // Break the cycle
                    return;
                }
                this._usernameNode.set("value", value);
                this._passwordNode.set("value", "");
                this.set("errors", {});
            },

            /**
             * Update the focus when the panel is displayed, putting focus into the email field
             */
            _setFocus: function() {
                if (this.get("visible")) {
                    this._passwordNode.focus();
                }
            },
            /**
             * Handle when the Cancel button is pressed
             * @param e {EventFacade} the event itself
             */
            _afterCancelClick: function(e) {
                this.fire("cancelled");
            }, 

            /**
             * Validate the entire form and then stop registration if there are any errors
             * @param e {EventFacade} The event itself
             */
            _beforeSigninClick: function(e) {
                this._afterPasswordChange();

                var errors = this.get("errors") || {};

                if (Object.keys(errors).length > 0) {
                    e.halt(true);
                }
            },

            /**
             * Handle when the Register button is pressed
             * @param e {EventFacade} the event itself
             */
            _afterSigninClick: function(e) {
                var username = this._usernameNode.get("value"),
                    password = this._passwordNode.get("value");

                this.fire("signin", {
                    username: username,
                    password: password
                });
            },
            /**
             * Ensure that we have a valid password
             * @param e {EventFacade} the event itself
             */
            _afterPasswordChange: function(e) {
                var password = this._passwordNode.get("value"),
                    errors = this.get("errors") || {};

                if (password == "") {
                    errors.password = "No password entered";
                }
                else {
                    delete errors.password;
                }
                this._updateErrors();
            },
            /**
             * Ensure that errors are displayed on the form correctly
             */
            _updateErrors: function() {
                var errors = this.get("errors"),
                    container = this.get("contentBox");

                container.all(".error").each(function(n) {
                    var labelNode = n.ancestor("label"),
                        elem = labelNode.getAttribute("rel"),
                        error = errors[elem];

                    if (error) {
                        n.setContent(error);
                        n.show();
                    }
                    else {
                        n.hide();
                    }
                });
            }
        }, {
            _TEMPLATE: [
                '<label rel="username">',
                'Username: <input class="{c username}" type="text" disabled="disabled" />',
                '<div class="error"></div>',
                '</label>',
                '<label rel="password">',
                'Password: <input class="{c password}" type="password" />',
                '<div class="error"></div>',
                '</label>',
                '<div>',
                    '<button class="{c signin}">Login</button>',
                    '<button class="{c cancel}">Cancel</button>',
                '</div>',
            ].join(""),
            _CLASS_NAMES: [
                "username",
                "password",
                "signin",
                "cancel"
            ],
            _EVENTS: {
                "signin": [{
                    type: "click", 
                    when: "before"
                }, {
                    type: "click", 
                    when: "after"
                }], 
                "cancel": ["click"],
                "password": ["change"]
            },
            _ATTRS_2_UI: {
                SYNC: ["username"],
                BIND: ["username"]
            },
            ATTRS: {
                username: {value: ""},
                errors: {value: {}}
            }
        });
}, "0.0.1", {
    requires: [
        "widget",
        "gallery-makenode"
    ]
});



