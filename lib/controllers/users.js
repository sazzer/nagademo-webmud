var users = require("../users"),
    winston = require("winston");

/**
 * Controller for retrieving a User by it's Unique ID
 * @param userid The User ID to retrieve
 * @param callback The callback function to pass the result to
 */
function retrieveUserById(userid, callback) {
    winston.debug("Received message: user:retrieveUserbyId: " + userid);
    users.retrieveUserById(userid, function(err, user) {
        var result = {
            error: err,
            user: user
        };
        callback(result);
    });
}

module.exports.handlers = {
    retrieveUserById: retrieveUserById
}
