YUI.add("webmud-views-terminal", function(Y) {
    /**
     * Class representing the View that contains the actual terminal
     */
    Y.namespace("WebMud.Views").TerminalView = Y.Base.create(
        "terminalView",
        Y.View,
        [],
        {
            /** The template used to render the view container */
            containerTemplate: [
                '<div class="terminalView">',
                    '<div class="output"></div>',
                    '<div class="input">',
                        '<input type="text" />',
                    '</div>',
                '</div>'
            ].join(""),
            initializer: function() {
                Y.fire("socket:register", {
                    message: "terminal:message",
                    callback: this._onIncomingMessage,
                    context: this
                });
            },
            /**
             * Actually render the view, creating all the various sub-panels
             */
            render: function() {
                var container = this.get("container"),
                    input = container.one(".input input");

                Y.fire("socket:send", {
                    message: "terminal:start"
                });
                
                input.after('key', this._onSendMessage.bind(this), "enter");
            },
            /**
             * Handle an incoming message
             */
            _onIncomingMessage: function(e) {
                var container = this.get("container"),
                    output = container.one(".output"),
                    reply = e.replyData;

                output.append(reply).append("<br />");
            },
            _onSendMessage: function() {
                var container = this.get("container"),
                    input = container.one(".input input"),
                    message = input.get("value");

                input.set("value", "");
                Y.fire("socket:send", {
                    message: "terminal:message",
                    data: message
                });
            }
        }, {
            ATTRS: {
            }
        });
}, "0.0.1", {
    requires: [
        "view",
        "event-key",
        "dump"
    ]
});

