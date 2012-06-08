YUI.add("webmud-character", function(Y) {
    /**
     * Model Class that represents a Character
     */
    Y.namespace("WebMud.Character").Character = Y.Base.create(
        "character",
        Y.Model,
        [],
        {
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
        "dump"
    ]
});

