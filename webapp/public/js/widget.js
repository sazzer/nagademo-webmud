define(["utils"], function(utils) {
    /**
     * Widget Mixin
     */
    var Widget = utils.Class({
        /**
         * Ensure the panel is visible
         */
        show: function() {
            this._contentBox.show();
        },
        /**
         * Ensure the panel is hidden
         */
        hide: function() {
            this._contentBox.hide();
        },
        /**
         * Render the widget into the container
         */
        render: function(container) {
            this._container = $(container);
            this._contentBox = $("<div />").appendTo(this._container);

            var template = Object.getPrototypeOf(this).constructor._TEMPLATE;
            if (template) {
                var node = $(template);
                this._contentBox.append(node);
            }

            var parser = Object.getPrototypeOf(this).constructor._HTML_PARSER;
            if (parser) {
                $.each(parser, $.proxy(function(i, v) {
                    this[i] = this._contentBox.find(v);
                }, this));
            }

            this._renderUi();
            this._bindUi();
            this._syncUi();
        }, 

        /**
         * Actually render the contents of the widget into the container
         */
        _renderUi: function() {
        },
        /**
         * Bind any events for the widget
         */
        _bindUi: function() {},
        /** 
         * Synchronize any initial state of the widget
         */
        _syncUi: function() {}
     }, { }, [ ]);

    return Widget;
});


