
function start(e) {
    var socket = e.socket,
        session = e.session;
    socket.emit("terminal:message", "Hello, World!");
    socket.emit("terminal:message", "The answer is: 42");
    socket.emit("terminal:message", "User: " + session.user.username);
}

function message(e) {
    var socket = e.socket,
        data = e.data;

    socket.emit("terminal:message", "You said: " + data);
}

module.exports.handlers = {
    start: start,
    message: message
}
