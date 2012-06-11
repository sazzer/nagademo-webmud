YUI.add("webmud-views-templateentry", function(Y) {
    /**
     */
    Y.namespace("WebMud.Views.Characters").TemplateEntryWidget = Y.Base.create(
        "templateEntryWidget",
        Y.Widget,
        [Y.MakeNode],
        {
            syncUI: function() {
                var templateActions = this.get("templateActions"),
                    template = this.get("template"),
                    action = templateActions[template.name];

                this._templateNameNode.append(template.name);
                var canGain = false, canLose = false;
                if (action) {
                    canGain = action.canGain;
                    canLose = action.canLower;
                }

                if (canGain || canLose) {
                    // Can gain or lose levels in this, so "enable" it
                    this._templateNode.addClass("enabled");
                    if (canGain) {
                        this._templateNode.addClass("gainEnabled");
                    }
                    if (canLose) {
                        this._templateNode.addClass("loseEnabled");
                    }
                }
            },
            bindUI: function() {
                this._gainNode.after("click", this._onGainClicked, this);
                this._lowerNode.after("click", this._onLowerClicked, this);
                this._templateNameNode.after("click", this._onTemplateClicked, this);
            },
            _onGainClicked: function() {
                var templateActions = this.get("templateActions"),
                    template = this.get("template"),
                    action = templateActions[template.name];

                if (action && action.canGain) {
                    this.fire("gain", {template: template});
                }
            },
            _onLowerClicked: function() {
                var templateActions = this.get("templateActions"),
                    template = this.get("template"),
                    action = templateActions[template.name];

                if (action && action.canLower) {
                    this.fire("lower", {template: template});
                }
            },
            _onTemplateClicked: function() {
                var templateActions = this.get("templateActions"),
                    template = this.get("template"),
                    action = templateActions[template.name];

                this.fire("templateClicked", {template: template});
            }
        }, {
            _TEMPLATE: [
                '<li class="{c template}">',
                    '<span class="{c gain}">+</span>',
                    '<span class="{c lower}">-</span>',
                    '<span class="{c templateName}"></span>',
                '</li>'
            ].join(""),
            _CLASS_NAMES: [
                "gain",
                "lower",
                "template",
                "templateName"
            ],
            _EVENTS: {
            },
            ATTRS: {
                template: {
                    value: null
                },
                templateActions: {
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



