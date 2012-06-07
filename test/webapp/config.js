var requirejs = require("requirejs"),
    path = require("path");

requirejs.config({
    baseUrl: path.join(__dirname, "../../webapp/public/js"),
    nodeRequire: require
});
