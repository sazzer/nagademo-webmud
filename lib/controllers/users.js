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

/**
 * Controller for getting the signin action.
 * Currently supported actions are register or signin, depending on if the user is known or not
 * TODO: Potential expansion to support external credentials
 * @param username The username to look up
 * @param callback Callback to trigger with the results
 */
function getSigninAction(username, callback) {
    winston.debug("Received message: user.signinAction: " + username);
    users.retrieveUserByUsername(username, function(err, user) {
        var result = {};

        if (user) {
            result.signinAction = "signin";
        }
        else {
            result.signinAction = "register";
        }
        callback(result);
    });
}

/**
 * Register a new user
 * @param registration The details of the user to register
 * @param callback Callback to trigger with the results
 */
function register(registration, callback) {
    users.registerUser(registration, function(err, user) {
        var result = {
            errors: err,
            user: user
        };
        callback(result);
    });
}

/**
 * Attempt to sign in the user
 * @param credentials The users credentials
 * @param callback Callback to trigger with the results
 */
function signin(credentials, callback) {
    users.retrieveUserByUsername(credentials.username, function(err, user) {
        var result = {};
        if (!user) {
            result.errors = {
                username: "Unknown username"
            };
            winston.debug("Unknown username: " + credentials.username);
        }
        else if (!user.comparePassword(credentials.password)) {
            result.errors = {
                password: "Invalid password"
            };
            winston.debug("Invalid password for: " + credentials.username);
        }
        else {
            result.user = user;
        }
        callback(result);
    });
}

module.exports.handlers = {
    retrieveUserById: retrieveUserById,
    getSigninAction: getSigninAction,
    signin: signin,
    register: register
}
