YUI.add("webmud-views-login", function(Y) {
    /**
     * Class representing the View that contains the Login and Registration forms
     */
    Y.namespace("WebMud.Views").LoginView = Y.Base.create(
        "loginView",
        Y.View,
        [],
        {
            /** The template used to render the view container */
            containerTemplate: [
                '<div class="loginView">',
                '</div>'
            ].join(""),
            /**
             * Actually render the view, creating all the various sub-panels
             */
            render: function() {
                var container = this.get("container");

                var loginPanel = new Y.WebMud.Views.Login.LoginPanel({
                    render: container
                });
                var registerPanel = new Y.WebMud.Views.Login.RegisterPanel({
                    render: container
                }).hide();
                var passwordPanel = new Y.WebMud.Views.Login.PasswordPanel({
                    render: container
                }).hide();
                var loginSpinner = new Y.WebMud.Views.Login.LoginSpinner({
                    render: container
                }).hide();

                this.set("loginPanel", loginPanel);
                this.set("registerPanel", registerPanel);
                this.set("passwordPanel", passwordPanel);
                this.set("loginSpinner", loginSpinner);

                loginPanel.after("signin", this._onSignIn, this);

                registerPanel.after("cancelled", this._showSignIn, this);
                registerPanel.after("register", this._doRegister, this);

                passwordPanel.after("cancelled", this._showSignIn, this);
                passwordPanel.after("signin", this._doSignIn, this);

                loginPanel.focus();
            },

            /**
             * Ensure that the username box is displayed
             */
            _showSignIn: function(e) {
                var loginPanel = this.get("loginPanel"),
                    loginSpinner = this.get("loginSpinner"),
                    passwordPanel = this.get("passwordPanel"),
                    registerPanel = this.get("registerPanel");

                loginPanel.show();
                loginSpinner.hide();
                registerPanel.hide();
                passwordPanel.hide();
            },

            /**
             * Handle when the username is entered, displaying either the register or password
             * form as appropriate
             * @param e {EventFacade} the event
             */
            _onSignIn: function(e) {
                var username = e.username,
                    loginPanel = this.get("loginPanel"),
                    loginSpinner = this.get("loginSpinner"),
                    passwordPanel = this.get("passwordPanel"),
                    registerPanel = this.get("registerPanel");

                loginPanel.hide();
                loginSpinner.show();
                Y.log("Sign in attempt as: " + username);
                Y.fire("socket:call", {
                    message: "users:getSigninAction",
                    data: username,
                    callback: function(d) {
                        var signinAction = d.replyData.signinAction;

                        Y.log("Sign in action: " + signinAction);
                        switch (signinAction) {
                            case "register":
                                registerPanel.set("username", username)
                                    .show();
                                loginSpinner.hide();
                                break;
                            case "signin":
                                passwordPanel.set("username", username)
                                    .show();
                                loginSpinner.hide();
                                break;
                        }
                    }
                });
            }, 

            /**
             * Handle the actual signing in of a user
             * @param e {EventFacade} the event
             */
            _doSignIn: function(e) {
                var username = e.username,
                    password = e.password,
                    loginSpinner = this.get("loginSpinner"),
                    passwordPanel = this.get("passwordPanel");

                loginSpinner.show();
                passwordPanel.hide();

                Y.fire("socket:call", {
                    message: "users:signin",
                    data: {
                        username: username, 
                        password: password
                    },
                    callback: Y.bind(function(d) {
                        var result = d.replyData;

                        if (result.errors) {
                            this.get("passwordPanel").set("errors", result.errors);
                            passwordPanel.show();
                            loginSpinner.hide();
                        }
                        else {
                            this.fire("loggedin", {
                                user: result.user
                            });
                        }
                    }, this)
                });
            },

            /**
             * Handle the actual registration of a user
             * @param e {EventFacade} the event
             */
            _doRegister: function(e) {
                var username = e.username,
                    password = e.password,
                    email = e.email,
                    loginSpinner = this.get("loginSpinner"),
                    registerPanel = this.get("registerPanel");

                loginSpinner.show();
                registerPanel.hide();

                Y.fire("socket:call", {
                    message: "users:register",
                    data: {
                        username: username,
                        password: password,
                        email: email
                    },
                    callback: Y.bind(function(d) {
                        var result = d.replyData;

                        if (result.errors) {
                            this.get("registerPanel").set("errors", result.errors);
                            registerPanel.show();
                            loginSpinner.hide();
                        }
                        else {
                            this.fire("loggedin", {
                                user: result.user
                            });
                        }
                    }, this)
                });
            }
        }, {
            ATTRS: {
                loginPanel: {},
                loginSpinner: {},
                registerPanel: {},
                passwordPanel: {}
            }
        });
}, "0.0.1", {
    requires: [
        "view",
        "dump",
        "webmud-views-loginspinner",
        "webmud-views-loginpanel",
        "webmud-views-registerpanel",
        "webmud-views-passwordpanel"
    ]
});
