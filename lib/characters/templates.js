var datastore = require("../datastore"),
    ObjectId = require("mongolian").ObjectId,
    winston = require("winston");

function Template(config) {
    var params = config || {};
    this.id = params.id;
    this.name = params.name;
    this.type = params.type;
    this.minRank = params.minRank || 0;
    this.maxRank = params.maxRank || 1;
    this.created = params.created;
    this.updated = params.updated;
}

Template.prototype = {
    toJson: function() {
        return {
            id: this.id,
            name: this.name,
            type: this.type,
            minRank: this.minRank,
            maxRank: this.maxRank,
            created: this.created,
            updated: this.updated
        }
    }
}
 
/**
 * Get the datastore collection
 * @return the collection
 */
function getCollection() {
    return datastore.getCollection("templates");
}

/**
 * Retrieve templates from the data store as discovered by the given query
 * @param query The query to use
 * @param callback The callback to call with the template
 */
function retrieveTemplates(query, callback) {
    getCollection().find(query).sort({"type": 1, "name": 1}).toArray(function (err, array) {
        if (err) {
            callback(err);
        }
        else {
            var data = [];
            for (var i in array) {
                var entry = array[i];
                entry.id = entry._id.toString();
                data.push(new Template(entry));
            }
            callback(null, data);
        }
    });
}

/**
 * Retrieve a single template with the given ID
 * @param id The ID
 * @param callback The callback to call with the template
 */
function retrieveTemplateById(id, callback) {
    var objserId = undefined;
    try {
        objserId = new ObjectId(id);
    }
    catch (err) {
        objserId = undefined;
    }

    if (objId) {
        retrieveTemplates({"_id": objId}, function(data) {
            if (err) {
                callback(err);
            }
            else if (data.length == 0) {
                callback("No template found with that ID: " + id);
            }
            else if (data.length > 1) {
                callback("Multiple templates found with that ID: " + id);
            }
            else {
                callback(null, data[0]);
            }
        });
    }
    else {
        callback("ID provided is not valid: " + id);
    }
}

/**
 * Retrieve a single template with the given name
 * @param name the name
 * @param callback The callback to call with the template
 */
function retrieveTemplateByName(name, callback) {
    retrieveTemplates({"name": name}, function(err, data) {
        if (err) {
            callback(err);
        }
        else if (data.length == 0) {
            callback("No template found with that name: " + name);
        }
        else if (data.length > 1) {
            callback("Multiple templates found with that name: " + name);
        }
        else {
            callback(null, data[0]);
        }
    });
}

/**
 * Retrieve all the templates with the given type
 * @param type the type
 * @param callback The callback to call with the templates
 */
function retrieveTemplatesByType(type, callback) {
    retrieveTemplates({"type": type}, callback);
}

/**
 * Retrieve all known templates
 * @param callback The callback to call with the templates
 */
function retrieveAllTemplates(callback) {
    retrieveTemplates({}, callback);
}

module.exports = {
    Template: Template,
    retrieveTemplateById: retrieveTemplateById,
    retrieveTemplateByName: retrieveTemplateByName,
    retrieveTemplatesByType: retrieveTemplatesByType,
    retrieveAllTemplates: retrieveAllTemplates
}
