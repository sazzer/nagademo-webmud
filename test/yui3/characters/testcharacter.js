var vows = require("vows"),
    assert = require("assert"),
    horaa = require("horaa"),
    YUI = require("yui").YUI;

YUI_config = require("../config");

vows.describe("Character").addBatch({
    "Character Points": {
        topic: function() {
            var callback = this.callback;
            YUI().use("webmud-character", function(Y) {
                var character = new Y.WebMud.Character.Character();
                callback(null, character);
            });
        },
        "add up correctly": function(character) {
            var stats = character.get("stats");
            assert.equal(stats.get("cost"), 60);
        },
        "set correctly": function(character) {
            character.get("stats").set("finesse", 20);
            assert.equal(character.get("stats").get("finesse"), 20);
        },
        "constructs correctly": function() {
            YUI().use("webmud-character", function(Y) {
                var character = new Y.WebMud.Character.Character({stats: {body: 20}});
                assert.equal(character.get("stats").get("body"), 20);
                var stats = character.get("stats");
                assert.equal(stats.get("cost"), 70);
            });
        }
    }
}).export(module);



