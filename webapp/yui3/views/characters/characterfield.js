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

                if (this.get("alwaysReadOnly")) {
                    // We change things about now
                    contentBox.one(".editMode").remove().destroy();
                    contentBox.one(".readOnlyMode").removeClass("readOnlyMode");
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
                '<div class="editMode"><input type="text" class="field" /></div>',
                '<span class="label">{s label}</span>',
            ].join(""),
            _CLASS_NAMES: [
            ],
            _EVENTS: {
            },
            ATTRS: {
                character: {
                    value: null
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




