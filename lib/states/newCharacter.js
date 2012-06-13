var characters = require("../characters/characters");

function NewCharacterState(config) {
    var params = config || {};
    this.session = params.session;
    this.stateChanger = params.stateChanger;
    this.messageSender = params.messageSender;
    this.stateHandler = undefined;
    this.character = new characters.Character({user: this.session.user});
}

function textToBool(text) {
    var up = text.toUpperCase();
    if (up == "Y" || up == "YES" || up == "TRUE") {
        return true;
    }
    else if (up == "N" || up == "NO" || up == "FALSE") {
        return false;
    }
    return null;
}

NewCharacterState.prototype = {
    entering: function() {
        var session = this.session;

        this.messageSender("New Character");
        this._askCharacterName();
    },
    handleText: function(text) {
        if (this.stateHandler) {
            this.stateHandler(text);
        }
    },
    _handleName: function(text) {
        this.messageSender("You said: '" + text + "'. Is this correct?");
        this.character.name = text;
        this.stateHandler = this._confirmName;
    },
    _confirmName: function(text) {
        var textBool = textToBool(text);
        if (textBool === true) {
            this.messageSender("Are you male or female?");
            this.stateHandler = this._handleGender;
        }
        else if (textBool === false) {
            this._askCharacterName();
        }
        else {
            this.messageSender("Please enter yes or no");
        }
    },
    _handleGender: function(text) {
        var up = text.toUpperCase();
        if (up == "M" || up == "MALE") {
            this.character.gender = "male";
        }
        else if (up == "F" || up == "FEMALE") {
            this.character.gender = "female";
        }
        else {
            this.messageSender("Please enter male or female");
        }
    },
    _askCharacterName: function() {
        this.character.name = "";
        this.messageSender("Please enter the name of your new character:");
        this.stateHandler = this._handleName;
    }
}

module.exports = NewCharacterState;

