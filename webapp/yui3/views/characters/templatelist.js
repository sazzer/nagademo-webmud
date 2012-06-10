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
            syncUI: function() {
            },
            bindUI: function() {
                this.after("templatesChange", this._renderTemplates, this);
                this.after("templateActionsChange", this._renderTemplates, this);
                this._typeListNode.delegate("click", this._onTemplateClick, ".templateLabel", this);
                this._typeListNode.delegate("click", this._onTemplateGainClick, ".gainEnabled .gain", this);
                this._typeListNode.delegate("click", this._onTemplateLowerClick, ".loseEnabled .lower", this);
            },
            _onTemplateClick: function(e) {
                var target = e.currentTarget,
                    templateNode = target.ancestor(".template"),
                    template = templateNode.getData("template"),
                    name = template.name;

                Y.log("Clicked on " + name);
            },
            _onTemplateGainClick: function(e) {
                var target = e.currentTarget,
                    templateNode = target.ancestor(".template"),
                    template = templateNode.getData("template"),
                    name = template.name;

                Y.log("Raising " + name);
            },
            _onTemplateLowerClick: function(e) {
                var target = e.currentTarget,
                    templateNode = target.ancestor(".template"),
                    template = templateNode.getData("template"),
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
                    Y.log("Template: " + Y.dump(v));
                    // Only render the templates that aren't special
                    if (specialTemplateTypes.indexOf(v.type) == -1) {
                        if (!templateTypeNodes[v.type]) {
                            var node = Y.Node.create(Y.substitute(_typeNodeTemplate, v));
                            templatesList.append(node);
                            var templatesNode = node.one("ul");
                            templateTypeNodes[v.type] = templatesNode;
                        }
                        var templateNode = Y.Node.create(Y.substitute(_templateNodeTemplate, v));
                        templateNode.setData("template", v);
                        templateTypeNodes[v.type].append(templateNode);
                        templateNodes[v.name] = templateNode;

                        var canGain = false, canLose = false;
                        if (templateActions[v.name]) {
                            canGain = templateActions[v.name].canGain;
                            canLose = templateActions[v.name].canLower;
                        }

                        if (canGain || canLose) {
                            // Can gain or lose levels in this, so "enable" it
                            templateNode.addClass("enabled");
                            if (canGain) {
                                templateNode.addClass("gainEnabled");
                            }
                            if (canLose) {
                                templateNode.addClass("loseEnabled");
                            }
                        }
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
        "dump"
    ]
});


