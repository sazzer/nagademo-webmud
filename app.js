var path = require("path"),
    util = require('util'),
    express = require('express'),
    winston = require("winston"),
    yui3 = require("express-yui3"),
    app = express.createServer(),
    io = require("socket.io").listen(app),
    datastore = require("./lib/datastore"),
    
    public = path.join(__dirname, "webapp/public"),

    port = process.env.PORT || 3000,
    mongoCredentials = process.env.MONGO || "mongo://localhost/webmud";

// Initial configuration of the Express server
app.configure(function() {
    app.use(express.logger());
    app.use(express.bodyParser()); // Allows us to parse HTTP Request bodies into JSON Objects
    app.use(express.cookieParser()); // Allows us to understand cookies
    app.use(express.session({secret: "0785ea65-ece7-4735-bf8c-1c131d78aa6c"})); // Allows us to use sessions
    app.use(express.compiler({ src: public, enable: ['less']})); // Compile Less stylesheets into CSS ones
    app.use(express.static(public)); // Make everything in /webapp/public available
    app.use("/yui3", yui3.handler(path.join(__dirname, "webapp/yui3")));
    app.use(app.router);
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());

  // Configure logging
  winston.remove(winston.transports.Console);
  winston.add(winston.transports.Console, { level: "warning" });
});

// Set up all of the Socket.IO controllers to use
var controllers = [
    "users"
].map(function(v) {
    var controller = require("./lib/controllers/" + v);
    winston.debug("Loaded controller " + v + ", " + util.inspect(controller));
    return {
        controller: controller,
        name: v
    };
});

datastore.connect(mongoCredentials);

// When we get a new Socket.IO connection, register all the controllers with it
io.sockets.on("connection", function(socket) {
    controllers.forEach(function(c) {
        if (c.controller.handlers) {
            for (var key in c.controller.handlers) {
                var handlerId = c.name + ":" + key,
                    handler = c.controller.handlers[key];
                if (handler instanceof Function) {
                    winston.debug("Registering handler for: " + handlerId);
                    socket.on(handlerId, handler);
                }
                else {
                    winston.error("Handler that wasn't a function found: " + handlerId + ", " + handler);
                }
            }
        }
    });
});

// And finally start the server
app.listen(port, function() {
    winston.debug("Server now listening on port " + port);
});

