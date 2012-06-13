/**
 * Test cases to test the New Character state
 */

var vows = require("vows"),
    assert = require("assert"),
    horaa = require("horaa"),
    users = require("../../lib/users"),
    newCharacter = require("../../lib/states/newCharacter");

var templates = horaa("../../../lib/characters/templates");
templates.hijack("retrieveAllTemplates", function(callback) {
    callback([]);
});

function buildState() {
    var messages = [];

    var session = {};
    var stateChanger = function(state) {};
    var messageSender = function(text) {
        messages.push(text);
    };
    var state = new newCharacter({
        session: session,
        stateChanger: stateChanger,
        messageSender: messageSender
    });

    state.entering();

    return {state: state, messages: messages, session: session};
}

vows.describe("New Character").addBatch({
    "Initially": {
        "Asks for a character name": function() {
            var topic = buildState();
            assert.include(topic.messages, "Please enter the name of your new character:"); 
        }
    },
    "After entering name": {
        "Confirms your entry": function() {
            var topic = buildState();
            while (topic.messages.pop());
            topic.state.handleText("Graham");
            assert.include(topic.messages, "You said: 'Graham'. Is this correct?");
            assert.equal(topic.state.character.name, "Graham");
        }
    },
    "After confirming name": {
        "Yes": function() {
            var topic = buildState();
            topic.state.handleText("Graham");
            while (topic.messages.pop());
            topic.state.handleText("yes");
            assert.include(topic.messages, "Are you male or female?");
            assert.equal(topic.state.character.name, "Graham");
        },
        "No": function() {
            var topic = buildState();
            topic.state.handleText("Graham");
            while (topic.messages.pop());
            topic.state.handleText("no");
            assert.include(topic.messages, "Please enter the name of your new character:"); 
            assert.equal(topic.state.character.name, "");
        },
        "Other": function() {
            var topic = buildState();
            topic.state.handleText("Graham");
            while (topic.messages.pop());
            topic.state.handleText("other");
            assert.include(topic.messages, "Please enter yes or no");
        }
    }
}).export(module);


