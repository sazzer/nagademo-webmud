define(["user", "views/login/username", "views/login/spinner", "views/login/register", "views/login/password", "widget", "utils"], function(user, UsernamePanel, LoginSpinner, RegisterPanel, PasswordPanel, Widget, utils) {
    /**
     * Class representing the view to login or register in
     */
    var LoginView = utils.Class({
        initializer: function(container) {
            this.container = container;
            this.panels = {
                usernamePanel: undefined,
                registerPanel: undefined,
                passwordPanel: undefined,
                spinnerPanel: undefined
            }
            this.render(container);
        },
        /**
         * Render the Login view
         */
        _renderUi: function() {
            this.panels.usernamePanel = new UsernamePanel(this._loginArea);
            this.panels.registerPanel = new RegisterPanel(this._loginArea);
            this.panels.passwordPanel = new PasswordPanel(this._loginArea);
            this.panels.spinnerPanel = new LoginSpinner(this._loginArea);
            this._showOne("usernamePanel");
        },
        _bindUi: function() {
            this.panels.registerPanel.on("cancelled", function(e) {
                this._showOne("usernamePanel");
            });
            this.panels.usernamePanel.on("signin", this._onUsernameEntered, this);
        },
        _onUsernameEntered: function(e) {
            var username = e.username;

            if (username) {
                this._showOne("spinnerPanel");
                this.panels.registerPanel.setUsername(username);
                this.panels.passwordPanel.setUsername(username);
                user.getUserLoginAction(username, this._onUserLoginActionReceived.bind(this));
            }
        },
        _onUserLoginActionReceived: function(action) {
            switch(action) {
                case "register":
                    this._showOne("registerPanel");
                    break;
                case "signin":
                    this._showOne("passwordPanel");
                    break;
                default:
                    this._showOne("usernamePanel");
                    break;
            }
        },
        /**
         * Ensure that exactly the names sub-panel is displayed
         */
        _showOne: function(name) {
            $.each(this.panels, function(i, v) {
                if (v) {
                    if (i == name) {
                        v.show();
                    }
                    else {
                        v.hide();
                    }
                }
            });
        }
    }, {
        _TEMPLATE: "<div class='loginView'></div>",
        _HTML_PARSER: {
            _loginArea: ".loginView"
        }
    }, [
        Widget
    ]);

    return LoginView;
});
