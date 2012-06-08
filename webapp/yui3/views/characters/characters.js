YUI.add("webmud-views-characters", function(Y) {
    /**
     */
    Y.namespace("WebMud.Views").CharactersView = Y.Base.create(
        "charactersView",
        Y.View,
        [],
        {
            /** The template used to render the view container */
            containerTemplate: [
                '<div class="charactersView">',
                '</div>'
            ].join(""),
            /**
             * Actually render the view, creating all the various sub-panels
             */
            render: function() {
                var container = this.get("container");
                Y.fire("socket:call", {
                    message: "templates:getAllTemplates",
                    callback: function(d) {
                        Y.log(Y.dump(d));
                    }
                });
            },
        }, {
            ATTRS: {
            }
        });
}, "0.0.1", {
    requires: [
        "view",
        "dump"
    ]
});

