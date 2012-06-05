var vows = require("vows"),
    assert = require("assert"),
    horaa = require("horaa"),
    YUI = require("yui").YUI;

YUI_config = require("../config");

vows.describe("Character Statistics").addBatch({
    "Character Points": {
        topic: function() {
            var callback = this.callback;
            YUI().use("webmud-character-stats", function(Y) {
                var stats = new Y.WebMud.Character.Stats();
                callback(null, stats);
            });
        },
        "add up correctly": function(stats) {
            assert.equal(stats.get("cost"), 60);
        }
    }
}).export(module);


