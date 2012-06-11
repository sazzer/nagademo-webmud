YUI.add("webmud-views-characterstats", function(Y) {
    /**
     */
    Y.namespace("WebMud.Views.Characters").CharacterStatsWidget = Y.Base.create(
        "characterStatsWidget",
        Y.Widget,
        [],
        {
            initializer: function() {
                this.after("templatesChange", this.templatesChanged, this);
                this.after("characterChange", this.syncUI, this);
            },
            renderUI: function() {
                var templates = this.get("templates"),
                    templateActions = this.get("templateActions"),
                    statsTemplateType = this.get("statsTemplateType"),
                    contentBox = this.get("contentBox");

                contentBox.empty();
                Y.each(Y.Array.filter(templates, function(v) {
                    return v.type == statsTemplateType;
                }), function(v) {
                    var templateEntry = new Y.WebMud.Views.Characters.TemplateEntryWidget({
                        render: contentBox, 
                        template: v,
                        templateActions: templateActions
                    });
                });
            },
            syncUI: function() {
            },
            bindUI: function() {
            },
            templatesChanged: function() {
                this.renderUI();
                this.syncUI();
            }
        }, {
            ATTRS: {
                character: {
                    value: null
                },
                templates: {
                    value: null
                },
                templateActions: {
                    value: null
                },
                statsTemplateType: {
                }
            }
        });
}, "0.0.1", {
    requires: [
        "widget",
        "array-extras",
        "webmud-views-templateentry",
        "dump"
    ]
});

