var characters = require("../characters/characters");

function InitialState(config) {
    var params = config || {};
    this.session = params.session;
    this.stateChanger = params.stateChanger;
    this.messageSender = params.messageSender;
}

InitialState.prototype = {
    entering: function() {
        var session = this.session,
            user = session.user,
            chars = characters.getUserCharacters(user);

        this.messageSender("Welcome to the game");
        if (chars && chars.length > 0) {
            this.stateChanger("characterList");
        }
        else {
            this.stateChanger("newCharacter");
        }
    }
}

module.exports = InitialState;
