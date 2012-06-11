YUI.add("webmud-views-charactersheet", function(Y) {
    /**
     */
    Y.namespace("WebMud.Views.Characters").CharacterSheetWidget = Y.Base.create(
        "characterSheetWidget",
        Y.Widget,
        [Y.MakeNode],
        {
            initializer: function() {
                this.after("characterChange", this._afterSetCharacter, this);
                this.after("templatesChange", this._afterSetTemplates, this);
                this.after("templateActionsChange", this._afterSetTemplateActions, this);
            },
            renderUI: function() {
                this.get("contentBox").append(this._makeNode());
                this._locateNodes();

                var coreDetails = new Y.WebMud.Views.Characters.CharacterCoreDetailsWidget({
                    render: this._coreDetailsNode,
                    character: this.get("character")
                });

                var charStats = new Y.WebMud.Views.Characters.TemplateListWidget({
                    render: this._charStatsNode,
                    character: this.get("character"),
                    templates: this.get("templates"),
                    templateActions: this.get("templateActions"),
                    specialTemplateTypes: [this.get("statsTemplateType")],
                    hideSpecials: false
                });

                this.set("charStatsWidget", charStats);
            },
            syncUI: function() {
            },
            bindUI: function() {
            },
            _afterSetTemplates: function(e) {
                var templates = e.newVal;

                this.get("charStatsWidget").set("templates", templates);
            },
            _afterSetTemplateActions: function(e) {
                var templateActions = e.newVal;

                this.get("charStatsWidget").set("templateActions", templateActions);
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
                    '<div class="{c charImage}">',
                    '</div>',
                    '<div class="{c charStats}">',
                    '</div>',
                '</div>'
            ].join(""),
            _CLASS_NAMES: [
                "coreDetails",
                "charImage",
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
                },
                charStatsWidget: {
                }
            }
        });
}, "0.0.1", {
    requires: [
        "widget",
        "dump",
        "webmud-views-charactercoredetails",
        "webmud-views-templatelist"
    ]
});



