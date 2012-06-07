define(["user", "views/login/username", "views/login/spinner", "widget", "utils"], function(user, UsernamePanel, LoginSpinner, Widget, utils) {
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
            this.panels.spinnerPanel = new LoginSpinner(this._loginArea);
            this._showOne("usernamePanel");
        },
        _bindUi: function() {
            this.panels.usernamePanel.on("signin", function(e) {
                this._showOne("spinnerPanel");
            }, this);
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
