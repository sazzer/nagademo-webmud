define(["widget", "utils", "eventable"], function(Widget, utils, Eventable) {
    /**
     * View that represents the login area
     * @param container The container to render into
     */
    function UsernamePanel(container) {
        this.container = $(container);
        this.render(this.container);
    }

    UsernamePanel.prototype = {
        _TEMPLATE: [
            '<label>Username: <input class="username" type="text" /></label>',
            '<div>',
                '<button class="signin">Sign In</button>',
            '</div>',
        ].join(""),
 
        /**
         * Render the Login view
         */
        _bindUi: function() {
            this.container.find(".signin").on("click", $.proxy(this._onSigninClick, this));
        },
        _onSigninClick: function() {
            var container = this.container,
                usernameBox = container.find(".username"),
                username = usernameBox.val();

            this.fire("signin", {
                username: username
            });
        }
    }
    utils.mix(UsernamePanel.prototype, Widget);
    utils.mix(UsernamePanel.prototype, Eventable);

    return UsernamePanel;
});

