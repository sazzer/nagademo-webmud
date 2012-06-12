YUI.add("webmud-views-newcharacter", function(Y) {
    /**
     */
    Y.namespace("WebMud.Views").NewCharacterView = Y.Base.create(
        "newCharacterView",
        Y.View,
        [],
        {
            /** The template used to render the view container */
            containerTemplate: [
                '<div class="newCharacterView">',
                    '<div class="actionBar">',
                        '<button class="create">Create</button>',
                    '</div>',
                    '<div class="characterDisplay">',
                    '</div>',
                    '<div class="templatesList">',
                    '</div>',
                '</div>'
            ].join(""),
            initializer: function() {
                Y.fire("user:get", {
                    context: this,
                    callback: this._onGetUser
                    });
            },
            /**
             * when we get the callback with the user, if we haven't already got a character then create it
             * @param user the user
             */
            _onGetUser: function(user) {
                var character = this.get("character");

                character.set("user", user);
            },
            /**
             * Attempt to create the character
             */
            _onCreateCharacter: function() {
                Y.log("Creating character");
            },
            /**
             * Actually render the view, creating all the various sub-panels
             */
            render: function() {
                var container = this.get("container"),
                    character = this.get("character"),
                    characterSheetNode = container.one(".characterDisplay"),
                    templateListNode = container.one(".templatesList");

                var characterSheet = new Y.WebMud.Views.Characters.CharacterSheetWidget({
                    character: character,
                    render: characterSheetNode
                });

                var templateList = new Y.WebMud.Views.Characters.TemplateListWidget({
                    character: character,
                    render: templateListNode
                });

                container.one("button.create").on("click", this._onCreateCharacter, this);

                this.set("characterSheet", characterSheet);
                this.set("templateList", templateList);

                Y.fire("socket:call", {
                    message: "templates:getAllTemplates",
                    context: this,
                    callback: function(d) {
                        var reply = d.replyData;
                        if (reply.error) {
                            Y.log("Error getting templates: " + reply.error);
                        }
                        else {
                            Y.log("Received templates");
                            characterSheet.set("templates", reply.templates);
                            templateList.set("templates", reply.templates);
                        }
                    }
                });

                Y.fire("socket:call", {
                    message: "templates:getAvailableTemplates",
                    context: this,
                    callback: function(d) {
                        var reply = d.replyData;
                        if (reply.error) {
                            Y.log("Error getting available templates: " + reply.error);
                        }
                        else {
                            characterSheet.set("templateActions", reply.templates);
                            templateList.set("templateActions", reply.templates);
                        }
                    }
                });
            },
        }, {
            ATTRS: {
                character: {
                    value: new Y.WebMud.Character.Character()
                },
                characterSheet: {},
                templateList: {}
            }
        });
}, "0.0.1", {
    requires: [
        "view",
        "webmud-character",
        "webmud-views-templatelist",
        "webmud-views-charactersheet"
    ]
});


