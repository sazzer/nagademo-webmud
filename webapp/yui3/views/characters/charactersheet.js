YUI.add("webmud-views-charactersheet", function(Y) {
    /**
     */
    Y.namespace("WebMud.Views.Characters").CharacterSheetWidget = Y.Base.create(
        "characterSheetWidget",
        Y.Widget,
        [Y.MakeNode],
        {
            initializer: function() {
                this.after("characterChanged", this._afterSetCharacter, this);
            },
            renderUI: function() {
                this.get("contentBox").append(this._makeNode());
                this._locateNodes();

                var charName = new Y.WebMud.Views.Characters.CharacterFieldWidget({
                    render: this._coreDetailsNode,
                    character: this.get("character"),
                    alwaysReadOnly: false,
                    strings: { label: "Name" },
                    field: "name"
                });

                var gender = new Y.WebMud.Views.Characters.CharacterFieldWidget({
                    render: this._coreDetailsNode,
                    character: this.get("character"),
                    alwaysReadOnly: false,
                    strings: { label: "Gender" },
                    field: "gender",
                    values: ["Male", "Female"]
                });

                var playerName = new Y.WebMud.Views.Characters.CharacterFieldWidget({
                    render: this._coreDetailsNode,
                    character: this.get("character"),
                    alwaysReadOnly: true,
                    strings: { label: "Player" },
                    field: "user.username"
                });

                var created = new Y.WebMud.Views.Characters.CharacterFieldWidget({
                    render: this._coreDetailsNode,
                    character: this.get("character"),
                    alwaysReadOnly: true,
                    strings: { label: "Created" },
                    field: "created",
                    defaultValue: new Date()
                });

                var lastPlayed = new Y.WebMud.Views.Characters.CharacterFieldWidget({
                    render: this._coreDetailsNode,
                    character: this.get("character"),
                    alwaysReadOnly: true,
                    strings: { label: "Last Played" },
                    field: "lastused",
                    defaultValue: "Never"
                });

                var age = new Y.WebMud.Views.Characters.CharacterFieldWidget({
                    render: this._coreDetailsNode,
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
            /**
             * Handler for when the character changes to keep the newCharacter and editCharacter
             * values in sync
             */
            _afterSetCharacter: function(e) {
                var character = e.newVal;

                if (character) {
                    if (character.isNew()) {
                        this.set("newCharacter", true);
                        this.set("editCharacter", true);
                    }
                    else {
                        this.set("newCharacter", false);
                    }
                }
                return v;
            }
        }, {
            _TEMPLATE: [
                '<div class="edit">',
                    '<div class="{c coreDetails}">',
                    /*
                        '<label class="characterName">',
                            '<div class="readOnlyMode"><span class="field {c charName}"></span></div>',
                            '<div class="editMode"><input type="text" class="{c charName}" /></div>',
                            '<span class="label">Name</span>',
                        '</label>',
                        '<label class="playerName">',
                            '<div><span class="field {c playerName}"></span></div>',
                            '<span class="label">Player</span>',
                        '</label>',
                        '<label class="created">',
                            '<div><span class="field {c created}">&nbsp;</span></div>',
                            '<span class="label">Created</span>',
                        '</label>',
                        '<label class="lastPlayed">',
                            '<div><span class="field {c lastPlayed}"></span></div>',
                            '<span class="label">Last Played</span>',
                        '</label>',
                        '<label class="age">',
                            '<div><span class="field {c age}"></span></div>',
                            '<span class="label">Age</span>',
                        '</label>',
                        */
                    '</div>',
                    '<div class="{c charStats}">',
                    '</div>',
                '</div>'
            ].join(""),
            _CLASS_NAMES: [
                "coreDetails",
                "charStats"
            ],
            _EVENTS: {
            },
            ATTRS: {
                character: {
                    value: null
                },
                templates: {
                    value: []
                },
                templateActions: {
                    value: {}
                },
                skillsTemplateType: {
                    value: "Skill"
                },
                statsTemplateType: {
                    value: "Stat"
                },
                newCharacter: {
                    value: false
                },
                editCharacter: {
                    value: false
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



