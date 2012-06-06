define([], function() {
    /**
     * Widget Mixin
     */
    var Widget = {
        /**
         * Ensure the panel is visible
         */
        show: function() {
            this.container.show();
        },
        /**
         * Ensure the panel is hidden
         */
        hide: function() {
            this.container.hide();
        },
        /**
         * Render the widget into the container
         */
        render: function(container) {
            this._container = $(container);

            var template = Object.getPrototypeOf(this)._TEMPLATE;
            if (template) {
                var node = $(template);
                this._container.append(node);
            }

            var parser = Object.getPrototypeOf(this)._HTML_PARSER;
            if (parser) {
                $.each(parser, $.proxy(function(i, v) {
                    this[i] = this._container.find(v);
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
    }

    return Widget;
});


