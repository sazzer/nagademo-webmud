/**
 * Representations of a User and functions to manage them
 */

var datastore = require("./datastore"),
    winston = require("winston"),
    dsCollection = "users";

/**
 * Constructor Function for the User class
 * @param config Any construction configuration
 */
function User(config) {
    var params = config || {};
    this.userid = params.userid;
    this.username = params.username;
    this.email = params.email;
}

/**
 * Attempt to retrieve the specific User record from the data store, looking up by
 * the unique ID of the user
 * @param userId The User ID to look up
 * @param callback The callback function to trigger
 */
function retrieveUserById(userId, callback) {
    datastore.retrieveById("users", userId, function(err, data) {
        if (err) {
            callback(err);
        }
        else if (!data) {
            callback("Unknown user: " + userId);
        }
        else {
            var user = new User({
                userid: userId,
                username: data.username,
                email: data.email
            });
            callback(null, user);
        }
    });
}

module.exports = {
    User: User,
    retrieveUserById: retrieveUserById
}
