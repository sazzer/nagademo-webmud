var path = require("path"),
    express = require('express'),
    winston = require("winston"),
    yui3 = require("express-yui3"),
    app = express.createServer(),
    io = require("socket.io").listen(app),
    
    public = path.join(__dirname, "webapp/public");

require("less");

app.configure(function() {
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
});

io.sockets.on("connection", function(socket) {
    socket.on("user:retrieveUserById", function(userid, fn) {
        console.log("Retrieved message: user:retrieveUserbyId: " + userid);
        var userDetails = {
            username: "sazzer",
            email: "graham@grahamcox.co.uk"
        };
        fn(userDetails);
    });
});
app.listen(3000, function() {
    console.log("Server now listening on port 3000");
});

