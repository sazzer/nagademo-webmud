define(["widget", "utils", "eventable"], function(Widget, utils, Eventable) {
    /**
     * Class representing the panel to enter a username into
     */
    var UsernamePanel = utils.Class({
        initializer: function(container) {
            this.render(container);
        },
        /**
         * Render the Login view
         */
        _bindUi: function() {
            this.getContentBox().find(".signin").on("click", $.proxy(this._onSigninClick, this));
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
            '<label>Username: <input class="username" type="text" /></label>',
            '<div>',
                '<button class="signin">Sign In</button>',
            '</div>',
        ].join("")
     }, [
        Widget,
        Eventable
    ]);

    return UsernamePanel;
});

