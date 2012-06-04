YUI({filter: "raw"}).use("webmud-app", function(Y) {
    var app = new Y.WebMud.App({
        container: "#body",
        viewContainer: "#body"
    });
    app.render();
});
