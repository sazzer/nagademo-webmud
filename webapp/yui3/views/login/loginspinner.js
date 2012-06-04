YUI.add("webmud-views-loginspinner", function(Y) {
    /**
     * Widget that simply shows a spinner */
     */
    Y.namespace("WebMud.Views.Login").LoginSpinner = Y.Base.create(
        "loginSpinner",
        Y.Widget,
        [Y.MakeNode],
        {
        }, {
            _TEMPLATE: [
                '<img src="images/loginSpinner.gif" class="spinner" />'
            ].join(""),
            _CLASS_NAMES: [
            ],
            _EVENTS: {
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


