define(["widget", "utils"], function(Widget, utils) {
    /**
     * Class representing the spinner to indicate something is happening
     */
    var LoginSpinner = utils.Class({
        initializer: function(container) {
            this.container = container;
            this.render(container);
        },
     }, {
        _TEMPLATE: [
            '<img src="images/loginSpinner.gif" class="spinner" />'
        ].join("")
     }, [
        Widget
    ]);

    return LoginSpinner;
});


