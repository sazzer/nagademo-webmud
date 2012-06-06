YUI.add("webmud-character", function(Y) {
    /**
     * Model Class that represents a Character
     */
    Y.namespace("WebMud.Character").Character = Y.Base.create(
        "character",
        Y.Model,
        [],
        {
            _setStats: function(v) {
                if (v instanceof (Y.WebMud.Character.Stats)) {
                    return v;
                }
                else {
                    var stats = this.get("stats");
                    if (!stats) {
                        stats = new Y.WebMud.Character.Stats(v);
                    }
                    else {
                        stats.setAttrs(v);
                    }
                    return stats;
                }
            }
        }, {
            ATTRS: {
                /** The ID of the character */
                id: {},
                /** The user that owns the character */
                user: {},
                /** The name of the character */
                name: {},
                /** The gender of the character */
                gender: {},
                /** The statistics of the character */
                stats: {
                    value: new Y.WebMud.Character.Stats(),
                    setter: "_setStats"
                },
                /** When the character was created */
                created: {
                    writeOnce: true
                },
                /** When the character was last used */
                lastused: {
                    writeOnce: true
                }
            }
        });
}, "0.0.1", {
    requires: [
        "model",
        "dump",
        "webmud-character-stats"
    ]
});

