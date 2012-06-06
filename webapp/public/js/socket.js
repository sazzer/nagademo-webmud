define([], function() {
    /** The Socket.io connection */
    var _socket = io.connect();

    /**
     * Make a semi-synchronous Socket.io call to the server
     * @param message The name of the message to use
     * @param arg The argument to the message
     * @param callback Callback to invoke with the response
     */
    function call(message, arg, callback) {
        _socket.emit(message, arg, function(reply) {
            callback({
                message: message, 
                sentData: arg,
                replyData: reply
            });
        });
    }

    /**
     * Wrapper class around a namespace of sockets
     * @param namespace The namespace of the socket
     */
    function Socket(namespace) {
        this.namespace = namespace;
    }

    /**
     * Call a namespaced semi-synchronous Socket.io call
     * @param message The name of the message to use
     * @param arg The argument to the message
     * @param callback Callback to invoke with the response
     */
    Socket.prototype.call = function(message, arg, callback) {
        call(this.namespace + ":" + message, arg, function(reply) {
            callback({
                namespace: this.namespace, 
                message: message, 
                sentData: arg,
                replyData: reply.replyData
            });
        });
    }

    return {
        Socket: Socket,
        call: call
    };
});

