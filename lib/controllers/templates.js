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

/**
 * Get all of the templates that are available to the character with the given ID
 * This does all the calculations to work out the templates available to either gain or lose ranks in, and which ways are possible
 */
function getAvailableTemplates(characterId, callback) {
    templates.retrieveAllTemplates(function(err, data) {
        if (err) {
            callback({error: err});
        }
        else {
            var results = {};
            for (var i in data) {
                var template = data[i];
                var next = {
                    canGain: template.name.indexOf(" ") > -1,
                    canLower: template.name.indexOf("Witch") > -1
                };

                results[template.name] = next;
            }
            callback({templates: results});
        }
    });
}

module.exports.handlers = {
    getAllTemplates: getAllTemplates,
    getAvailableTemplates: getAvailableTemplates
}


