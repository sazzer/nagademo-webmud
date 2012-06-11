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

                var coreDetails = new Y.WebMud.Views.Characters.CharacterCoreDetailsWidget({
                    render: this._coreDetailsNode,
                    character: this.get("character")
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
        "webmud-views-charactercoredetails"
    ]
});



