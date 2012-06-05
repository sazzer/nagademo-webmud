YUI.add("webmud-character-list", function(Y) {
    /**
     * Model Class that represents a list of Characters
     */
    Y.namespace("WebMud").CharacterList = Y.Base.create(
        "characterList",
        Y.ModelList,
        [],
        {
            model: Y.WebMud.Character,
            /**
             * Compare models for sorting by their last used date, or else their creation date, or else their name
             * Should never get as far as name, but you never know...
             * @param model The model to get the comparison value from
             */
            comparator: function(model) {
                return model.get("lastused") || model.get("created") || model.get("name");
            },
            /**
             * Sync method to load the characters from the server
             */
            sync: function(action, options, callback) {
                switch (action) {
                    case "read":
                        var user = this.get("user"),
                            userid = user.get("id");

                        Y.log("Loading characters for user with ID: " + userid);
                        Y.fire("socket:call", {
                            message: "characters:getUserCharacters",
                            data: userid,
                            callback: function(d) {
                                var result = d.replyData;
                                Y.log("Character details: " + Y.dump(result));
                                callback(result.error, result.characters);
                            }
                        });
                        break;
                    default:
                        callback("Unsupported sync action: " + action);
                }
            }
        }, {
            ATTRS: {
                /** The user that owns the characters */
                user: {}
            }
        });
}, "0.0.1", {
    requires: [
        "model-list",
        "dump",
        "webmud-character"
    ]
});


