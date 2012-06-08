var templates = require("../characters/templates"),
    winston = require("winston"),
    util = require("util");

/**
 * Get all of the templates that are defined
 */
function getAllTemplates(ignored, callback) {
    winston.debug("Callback: " + util.inspect(arguments));
    templates.retrieveAllTemplates(function(err, data) {
        var results = [];
        for (var i in data) {
            results.push(data[i].toJson());
        }
        winston.debug("Retrieve templates: " + util.inspect(results));
        callback({
            error: err,
            templates: results
        });
    });
}

module.exports.handlers = {
    getAllTemplates: getAllTemplates
}


