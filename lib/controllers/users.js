var datastore = require("../datastore"),
    winston = require("winston");

function retrieveUserById(userid, callback) {
    console.log("Received message: user:retrieveUserbyId: " + userid);
    datastore.retrieveById("users", userid, function(err, data) {
        var result;
        if (err) {
            result = {
                error: err
            }
        }
        else if (data) {
            winston.debug("Retrieved user: " + data.username);
            result = {
                username: data.username,
                email: data.email
            };
        }
        else {
            winston.debug("No user found for ID: " + userid);
            result = {
                error: "Unknown user: " + userid
            }
        }
        callback(result);
    });
}

module.exports.handlers = {
    retrieveUserById: retrieveUserById
}
