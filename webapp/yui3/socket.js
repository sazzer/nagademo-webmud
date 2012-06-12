YUI.add("webmud-socketio", function(Y) {
    /**
     * Class encapsulating the Socket.IO connection in a nice, easy to use manner.
     * All tranmissions between client and server are treated as global events, so
     * all other code needs to simply fire the appropriate event and it will make it
     * to the server to be handled there.
     */
    Y.namespace("WebMud").Socket = Y.Base.create(
        "socket",
        Y.Base,
        [],
        {
            /**
             * Initialize the Socket.IO wrapper
             */
            initializer: function() {
                this._socket = io.connect();
                Y.publish("socket:call", {
                    emitFacade: true,
                    broadcast: 2 // 2 means to broadcast globally
                    });
                Y.publish("socket:send", {
                    emitFacade: true,
                    broadcast: 2 // 2 means to broadcast globally
                    });
                Y.publish("socket:register", {
                    emitFacade: true,
                    broadcast: 2 // 2 means to broadcast globally
                    });
                Y.on("socket:register", this._register, this);
                Y.on("socket:send", this._send, this);
                Y.on("socket:call", this._call, this);
            },

            /**
             * Event handler for a Call request - i.e. when the request should be made and a callback
             * triggered with data returned from the call
             * @param e {EventFacade} The details of the event
             */
            _call: function(e) {
                var data = e.data,
                    id = e.message,
                    callback = e.callback,
                    context = e.context;

                Y.log("Sending request with ID: " + id, "debug", "socket");
                this._socket.emit(id, data, function(reply) {
                    callback.call(context, {
                        message: id,
                        sentData: data,
                        replyData: reply
                    });
                });
            },

            /**
             * Event handler for a Send request - i.e. when the request should be made but no callback triggered
             * @param e {EventFacade} The details of the event
             */
            _send: function(e) {
                var data = e.data,
                    id = e.message;

                Y.log("Sending request with ID: " + id, "debug", "socket");
                this._socket.emit(id, data);
            },

            /**
             * Event handler to register a listener for a future incoming message
             * @param e {EventFacade} The details of the event
             */
            _register: function(e) {
                var id = e.message,
                    callback = e.callback,
                    context = e.context;

                this._socket.on(id, function(reply) {
                    callback.call(context, {
                        message: id,
                        replyData: reply
                    });
                });
            }
        }, {
            ATTRS: {
            }
        });
}, "0.0.1", {
    "requires": [
        "base"
    ]
});
