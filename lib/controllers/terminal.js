
function stateChanger(session, socket, state) {
    var stateClass = require("../states/" + state);
    if (session.state) {
        if (session.state.leaving) {
            session.state.leaving();
        }
        session.state = undefined;
    }
    var newState = new stateClass({
        session: session,
        stateChanger: function(state) {
            stateChanger(session, socket, state);
        },
        messageSender: function(message) {
            socket.emit("terminal:message", message);
        }
    });
    session.state = newState;
    if (session.state.entering) {
        session.state.entering();
    }
}

function start(e) {
    var socket = e.socket,
        session = e.session;

    stateChanger(session, socket, "initial");
}

function message(e) {
    var session = e.session,
        state = session.state,
        data = e.data;

    if (state) {
        if (state.handleText) {
            state.handleText(data);
        }
    }
}

module.exports.handlers = {
    start: start,
    message: message
}
