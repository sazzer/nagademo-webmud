define(["widget", "utils", "eventable"], function(Widget, utils, Eventable) {
    /**
     * Class representing the panel to enter registration details into
     */
    var RegisterPanel = utils.Class({
        initializer: function(container) {
            this.render(container);
        },
        /**
         * Render the Login view
         */
        _bindUi: function() {
            this.getContentBox().find(".signin").on("click", this._onSigninClick.bind(this));
            this.getContentBox().find(".cancel").on("click", this._onCancelClick.bind(this));
        },
        _onCancelClick: function() {
            this.fire("cancelled");
        },
        _onSigninClick: function() {
            var container = this.getContentBox(),
                usernameBox = container.find(".username"),
                username = usernameBox.val();

            this.fire("signin", {
                username: username
            });
        }
     }, {
        _TEMPLATE: [
            '<label rel="username">',
                'Username: <input class="username" type="text" disabled="disabled" />',
                '<div class="error"></div>',
            '</label>',
            '<label rel="email">',
                'Email Address: <input class="email" type="text" />',
                '<div class="error"></div>',
            '</label>',
            '<label rel="password">',
                'Password: <input class="password" type="password" />',
                '<div class="error"></div>',
            '</label>',
            '<label rel="password2">',
                'Re-enter Password: <input class="password2" type="password" />',
                '<div class="error"></div>',
            '</label>',
            '<div>',
                '<button class="register">Register</button>',
                '<button class="cancel">Cancel</button>',
            '</div>',
        ].join("")
     }, [
        Widget,
        Eventable
    ]);

    return RegisterPanel;
});


