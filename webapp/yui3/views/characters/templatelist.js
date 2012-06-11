YUI.add("webmud-views-templatelist", function(Y) {
    var _typeNodeTemplate = [
        '<li>',
            '<span class="typeLabel">{type}</span>',
            '<ul>',
            '</ul>',
        '</li>'
    ].join(""),

    _templateNodeTemplate = [
        '<li class="template">',
            '<span class="gain">+</span>',
            '<span class="lower">-</span>',
            '<span class="templateLabel">{name}</span>',
        '</li>'
    ].join("");


    /**
     */
    Y.namespace("WebMud.Views.Characters").TemplateListWidget = Y.Base.create(
        "templateListWidget",
        Y.Widget,
        [Y.MakeNode],
        {
            bindUI: function() {
                this.after("templatesChange", this._renderTemplates, this);
                this.after("templateActionsChange", this._renderTemplates, this);
                this.after("*:gain", this._onTemplateGainClick, this);
                this.after("*:lower", this._onTemplateLowerClick, this);
                this.after("*:templateClicked", this._onTemplateClick, this);
            },
            _onTemplateClick: function(e) {
                var template = e.template,
                    name = template.name;

                Y.log("Clicked on " + name);
            },
            _onTemplateGainClick: function(e) {
                var template = e.template,
                    name = template.name;

                Y.log("Raising " + name);
            },
            _onTemplateLowerClick: function(e) {
                var template = e.template,
                    name = template.name;

                Y.log("Lowering " + name);
            },
            _renderTemplates: function() {
                var templates = this.get("templates"),
                    templateActions = this.get("templateActions"),
                    specialTemplateTypes = this.get("specialTemplateTypes"),
                    templateNodes = this.get("templateNodes"),
                    templatesList = this._typeListNode,
                    templateTypeNodes = {};

                templatesList.empty();
                Y.each(templates, function(v) {
                    // Only render the templates that aren't special
                    var isSpecial = (specialTemplateTypes.indexOf(v.type) > -1);
                    if (isSpecial != this.get("hideSpecials")) {
                        if (!templateTypeNodes[v.type]) {
                            var node = Y.Node.create(Y.substitute(_typeNodeTemplate, v));
                            templatesList.append(node);
                            var templatesNode = node.one("ul");
                            templateTypeNodes[v.type] = templatesNode;
                        }

                        var templateEntry = new Y.WebMud.Views.Characters.TemplateEntryWidget({
                            render: templateTypeNodes[v.type],
                            template: v,
                            templateActions: templateActions
                        });

                        templateEntry.addTarget(this);
                    }
                }, this);
            }
        }, {
            _TEMPLATE: [
                '<ul class="{c typeList}">',
                '</ul>'
            ].join(""),
            _CLASS_NAMES: [
                "typeList"
            ],
            _EVENTS: {
            },
            ATTRS: {
                specialTemplateTypes: {
                    value: ["Stat", "Skill"]
                },
                hideSpecials: {
                    value: true,
                },
                templates: {
                    value: []
                },
                templateActions: {
                    value: {}
                },
                templateNodes: {
                    value: {}
                }
            }
        });
}, "0.0.1", {
    requires: [
        "widget",
        "dump",
        "webmud-views-templateentry"
    ]
});


