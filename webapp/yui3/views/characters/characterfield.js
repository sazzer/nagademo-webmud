YUI.add("webmud-views-characterfield", function(Y) {
    /**
     * Widget for displaying and editing a field on the character
     */
    Y.namespace("WebMud.Views.Characters").CharacterFieldWidget = Y.Base.create(
        "characterFieldWidget",
        Y.Widget,
        [Y.MakeNode],
        {
            CONTENT_TEMPLATE: null,
            BOUNDING_TEMPLATE: '<label class="characterField"></label>',
            initializer: function() {
            },
            renderUI: function() {
                var contentBox = this.get("contentBox");

                contentBox.append(this._makeNode());
                this._locateNodes();

                // We change things about now
                if (this.get("alwaysReadOnly")) {
                    contentBox.one(".readOnlyMode").removeClass("readOnlyMode");
                }
                else {
                    var values = this.get("values");
                    if (Y.Lang.isArray(values)) {
                        var vals = {};
                        Y.each(values, function(v) {
                            vals[v] = v;
                        });
                        values = vals;
                    }

                    if (Y.Lang.isObject(values)) {
                        var editNode = Y.Node.create(Y.WebMud.Views.Characters.CharacterFieldWidget._MULTIPLE_EDIT_FIELD);
                        var selectNode = editNode.one("select");
                        Y.each(values, function(v, k) {
                            var option = Y.Node.create("<option></option>");
                            option.append(v);
                            option.setAttribute("value", k);
                            selectNode.append(option);
                        });
                        contentBox.prepend(editNode);
                    }
                    else {
                        contentBox.prepend(Y.WebMud.Views.Characters.CharacterFieldWidget._SIMPLE_EDIT_FIELD);
                    }
                }
            },
            syncUI: function() {
                var character = this.get("character"),
                    field = this.get("field"),
                    defaultValue = this.get("defaultValue"),
                    contentBox = this.get("contentBox"),
                    roField = contentBox.one("span.field"),
                    rwField = contentBox.one("input.field"),
                    value = undefined;

                if (character) {
                    value = character;
                    Y.each(field.split("."), function(v) {
                        if (value != undefined) {
                            if (Y.Lang.isFunction(value.get)) {
                                value = value.get(v);
                            }
                            else if (Y.Lang.isObject(value)) {
                                value = value[v];
                            }
                            else {
                                value = undefined;
                            }
                        }
                    });
                }

                if (value == undefined) {
                    value = defaultValue;
                }
                
                if (value instanceof Date) {
                    value = value.toISOString();
                }

                roField.setHTML(value);
                if (rwField) {
                    rwField.set("value", value);
                }
            },
            bindUI: function() {
                var character = this.get("character"),
                    field = this.get("field");

                if (field.indexOf(".") > -1) {
                    field = field.substr(0, field.indexOf("."));
                }

                character.after(field + "Changed", this.syncUI, this);
            },
        }, {
            _TEMPLATE: [
                '<div class="readOnlyMode"><span class="field"></span></div>',
                '<span class="label">{s label}</span>',
            ].join(""),
            _SIMPLE_EDIT_FIELD: '<div class="editMode"><input type="text" class="field" /></div>',
            _MULTIPLE_EDIT_FIELD: '<div class="editMode"><select class="field"><option>Select</option></select></div>',
            _CLASS_NAMES: [
            ],
            _EVENTS: {
            },
            ATTRS: {
                character: {
                    value: null
                },
                values: {
                    value: null,
                    writeOnce: true
                },
                defaultValue: {
                    value: "",
                    writeOnce: true
                },
                alwaysReadOnly: {
                    value: false,
                    writeOnce: true
                },
                strings: {
                    value: {}
                },
                field: {
                    value: null,
                    writeOnce: true
                }
            }
        });
}, "0.0.1", {
    requires: [
        "widget",
        "dump"
    ]
});




