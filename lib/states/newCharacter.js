var characters = require("../characters/characters");

function NewCharacterState(config) {
    var params = config || {};
    this.session = params.session;
    this.stateChanger = params.stateChanger;
    this.messageSender = params.messageSender;
}

NewCharacterState.prototype = {
    entering: function() {
        var session = this.session;

        this.messageSender("New Character");
    }
}

module.exports = NewCharacterState;

