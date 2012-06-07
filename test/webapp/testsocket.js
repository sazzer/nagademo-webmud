var requirejs = require("requirejs"),
    path = require("path"),
    vows = require("vows"),
    assert = require("assert");

require("./config");

io = {
    connect: function() {return io;},
    emit: function() {}
};

requirejs(['socket'], function(socket) {
    vows.describe("Socket.io Wrapper").addBatch({
        "call": {
            topic: function() {
                io.emit = function(message, arg, callback) {
                    this.callback(null, {
                        message: message, 
                        arg: arg,
                        callback: callback
                    });
                };
            },
            "Calls the right method": function() {

                socket.call("test", {}, function() {
                });
            }
        }
    }).export(module);
});

