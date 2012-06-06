define(["user", "views/login/username", "widget", "utils"], function(user, UsernamePanel, Widget, utils) {

    /**
     * View that represents the login area
     * @param container The container to render into
     */
    function LoginView(container) {
        this.container = container;
        this.panels = {
            usernamePanel: undefined,
            registerPanel: undefined,
            passwordPanel: undefined,
            spinnerPanel: undefined
        }

        this.render(this.container);
    }

    LoginView.prototype = {
        _TEMPLATE: "<div class='loginView'></div>",
        _HTML_PARSER: {
            _loginArea: ".loginView"
        },
        /**
         * Render the Login view
         */
        _renderUi: function() {
            this.panels.usernamePanel = new UsernamePanel(this._loginArea);
            this._showOne("usernamePanel");
        },
        _bindUi: function() {
            this.panels.usernamePanel.on("signin", function(e) {
                alert("Username: " + e.username);
            });
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
    }
    utils.mix(LoginView.prototype, Widget);

    return LoginView;
});
