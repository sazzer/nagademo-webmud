YUI.add("webmud-views-newcharacter", function(Y) {
    /**
     */
    Y.namespace("WebMud.Views").NewCharacterView = Y.Base.create(
        "newCharacterView",
        Y.View,
        [],
        {
            /** The template used to render the view container */
            containerTemplate: [
                '<div class="newCharacterView">',
                    '<div class="characterDisplay">',
                    '</div>',
                    '<div class="templatesList">',
                    '</div>',
                '</div>'
            ].join(""),
            /**
             * Actually render the view, creating all the various sub-panels
             */
            render: function() {
                var container = this.get("container"),
                    templateListNode = container.one(".templatesList");

                var templateList = new Y.WebMud.Views.Characters.TemplateListWidget({
                    render: templateListNode
                });

                this.set("templateList", templateList);

                Y.fire("socket:call", {
                    message: "templates:getAllTemplates",
                    context: this,
                    callback: function(d) {
                        var reply = d.replyData;
                        if (reply.error) {
                            Y.log("Error getting templates: " + reply.error);
                        }
                        else {
                            Y.log("Received templates");
                            templateList.set("templates", reply.templates);
                        }
                    }
                });

                Y.fire("socket:call", {
                    message: "templates:getAvailableTemplates",
                    context: this,
                    callback: function(d) {
                        var reply = d.replyData;
                        if (reply.error) {
                            Y.log("Error getting available templates: " + reply.error);
                        }
                        else {
                            templateList.set("templateActions", reply.templates);
                        }
                    }
                });
            },
        }, {
            ATTRS: {
                templateList: {}
            }
        });
}, "0.0.1", {
    requires: [
        "view",
        "webmud-views-templatelist"
    ]
});


