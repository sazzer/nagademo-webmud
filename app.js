var express = require('express'),
    winston = require("winston"),
    yui3 = require("express-yui3"),
    app = express.createServer(),
    io = require("socket.io").listen(app);

app.configure(function() {
    app.use(express.bodyParser()); // Allows us to parse HTTP Request bodies into JSON Objects
    app.use(express.cookieParser()); // Allows us to understand cookies
    app.use(express.session({secret: "0785ea65-ece7-4735-bf8c-1c131d78aa6c"})); // Allows us to use sessions
    app.use(express.compiler({ src: __dirname + '/webapp/public', enable: ['less']})); // Compile Less stylesheets into CSS ones
    app.use(express.static(__dirname + '/webapp/public')); // Make everything in /webapp/public available
    app.use("/yui3", yui3.handler(__dirname + "/webapp/yui3"));
    app.use(app.router);
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

app.listen(3000, function() {
    console.log("Server now listening on port 3000");
});

