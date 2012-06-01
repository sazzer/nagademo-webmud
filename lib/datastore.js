var Mongolian = require("mongolian"),
    winston = require("winston"),
    util = require("util"),
    db;

/**
 * Connect to the underlying data store
 * @param uri URI Representing the connection details to the data store to use
 */
function connect(uri) {
    db = new Mongolian(uri);
    winston.debug("Connected to datastore " + uri + ": " + db);
}

/**
 * Retrieve a single object from the appropriate collection by it's unique ID
 * @param collection The name of the collection to query
 * @param id The ID of the object to retrieve
 * @param callback Callback function to trigger when the data is retrieved
 */
function retrieveById(collection, id, callback) {
    var coll = db.collection(collection);
    winston.debug("Retrieving object from collection " + collection + " with ID: " + util.inspect(id));
    coll.findOne({"_id": id}, function(err, data) {
        if (err) {
            winston.error("Error retrieving object from collection " + collection + " with ID: " + util.inspect(id) + ", " + err);
        }
        callback(err, data);
    });
}

module.exports = {
    connect: connect,
    retrieveById: retrieveById
}
