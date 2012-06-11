YUI.add("webmud-views-charactercoredetails", function(Y) {
    /**
     */
    Y.namespace("WebMud.Views.Characters").CharacterCoreDetailsWidget = Y.Base.create(
        "characterCoreDetailsWidget",
        Y.Widget,
        [],
        {
            renderUI: function() {
                var charName = new Y.WebMud.Views.Characters.CharacterFieldWidget({
                    render: this.get("contentBox"),
                    character: this.get("character"),
                    alwaysReadOnly: false,
                    strings: { label: "Name" },
                    field: "name"
                });

                var gender = new Y.WebMud.Views.Characters.CharacterFieldWidget({
                    render: this.get("contentBox"),
                    character: this.get("character"),
                    alwaysReadOnly: false,
                    strings: { label: "Gender" },
                    field: "gender",
                    values: ["Male", "Female"]
                });

                var playerName = new Y.WebMud.Views.Characters.CharacterFieldWidget({
                    render: this.get("contentBox"),
                    character: this.get("character"),
                    alwaysReadOnly: true,
                    strings: { label: "Player" },
                    field: "user.username"
                });

                var created = new Y.WebMud.Views.Characters.CharacterFieldWidget({
                    render: this.get("contentBox"),
                    character: this.get("character"),
                    alwaysReadOnly: true,
                    strings: { label: "Created" },
                    field: "created",
                    defaultValue: new Date()
                });

                var lastPlayed = new Y.WebMud.Views.Characters.CharacterFieldWidget({
                    render: this.get("contentBox"),
                    character: this.get("character"),
                    alwaysReadOnly: true,
                    strings: { label: "Last Played" },
                    field: "lastused",
                    defaultValue: "Never"
                });

                var age = new Y.WebMud.Views.Characters.CharacterFieldWidget({
                    render: this.get("contentBox"),
                    character: this.get("character"),
                    alwaysReadOnly: true,
                    strings: { label: "Age" },
                    field: "age",
                    defaultValue: "New"
                });
            },
            syncUI: function() {
            },
            bindUI: function() {
            },
        }, {
            ATTRS: {
                character: {
                    value: null
                }
            }
        });
}, "0.0.1", {
    requires: [
        "widget",
        "dump",
        "webmud-views-characterfield"
    ]
});




