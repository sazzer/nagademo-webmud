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
 * Get the named collection from the data store
 * @param collection The name of the collection to get
 * @return the collection itself
 */
function getCollection(collection) {
    return db.collection(collection);
}

module.exports = {
    connect: connect,
    getCollection: getCollection
}
