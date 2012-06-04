/**
 * Representations of a User and functions to manage them
 */

var datastore = require("./datastore"),
    ObjectId = require("mongolian").ObjectId,
    winston = require("winston"),
    async = require("async"),
    hash = require("mhash").hash;

/**
 * Constructor Function for the User class
 * @param config Any construction configuration
 */
function User(config) {
    var params = config || {};
    this.userid = params.userid;
    this.username = params.username;
    this.email = params.email;
    this.hashedPassword = params.hashedPassword;
    this.registered = params.registered;
    this.updated = params.updated;
    this.active = params.active;
}

/**
 * Helper to hash a password
 * @param p The password
 * @return the hashed password
 */
function hashPassword(p) {
    return hash("sha1", p);
}

User.prototype = {
    /**
     * Set the hashed password
     * @param p The unhashed password
     */
    setPassword: function(p) {
        this.hashedPassword = hashPassword(p);
    },
    /**
     * Compare passwords
     * @param p An unhashed password to compare
     * @return True if the unhashed password matches that of this user. False otherwise
     */
    comparePassword: function(p) {
        var hashedIncomingPassword = hashPassword(p);
        return hashedIncomingPassword == this.hashedPassword;
    },
    /**
     * Get the raw JSON object of this user
     * @return the JSON
     */
    toJson: function() {
        return {
            userid: this.userid,
            username: this.username,
            email: this.email,
            hashedPassword: this.hashedPassword,
            registered: this.registered,
            updated: this.updated,
            active: this.active
        }
    }
}

/**
 * Get the datastore collection
 * @return the collection
 */
function getCollection() {
    return datastore.getCollection("users");
}

/**
 * Attempt to retrieve the specific User record form the data store, looking up by 
 * an arbitrary query passed in
 * @param query A query to find the user
 * @param callback The callback function to trigger
 */
function retrieveUserByQuery(query, callback) {
    getCollection().findOne(query, function(err, data) {
        if (err) {
            callback(err);
        }
        else if (!data) {
            callback(null, null);
        }
        else {
            var userDetails = data;
            userDetails.userid = data._id.toString();
            var user = new User(userDetails);

            callback(null, user);
        }
    });
}

/**
 * Attempt to retrieve the specific User record from the data store, looking up by
 * the unique ID of the user
 * @param userId The User ID to look up
 * @param callback The callback function to trigger
 */
function retrieveUserById(userId, callback) {
    retrieveUserByQuery({"_id": new ObjectId(userId)}, callback);
}

/**
 * Attempt to retrieve the specific User record form the data store, looking up by the
 * unique username of the user
 * @param username The user name to look up
 * @param callback The callback function to trigger
 */
function retrieveUserByUsername(username, callback) {
    retrieveUserByQuery({"username": username}, callback);
}

/**
 * Attempt to retrieve the specific User record form the data store, looking up by the
 * email address of the user
 * @param email The email address to look up
 * @param callback The callback function to trigger
 */
function retrieveUserByEmail(email, callback) {
    retrieveUserByQuery({"email": email}, callback);
}

/**
 * Attempt to register a new user.
 * @param registration The details of the user to register
 * @param callback The callback function to trigger
 */
function registerUser(registration, callback) {
    var errors = {};

    async.parallel({
        username: function(callback) {
            retrieveUserByUsername(registration.username, function(err, user) {
                if (user) {
                    errors.username = "That username is already registered";
                }
                winston.debug("Retrieved user by username: " + registration.username);
                callback();
            });
        },
        email: function(callback) {
            retrieveUserByEmail(registration.email, function(err, user) {
                if (user) {
                    errors.email = "That email address is already registered";
                }
                winston.debug("Retrieved user by email: " + registration.email);
                callback();
            });
        },
    }, function() {
        if (Object.keys(errors).length > 0) {
            callback(errors, null);
        }
        else {
            var newUser = new User(registration);
            newUser.registered = new Date();
            newUser.updated = new Date();
            newUser.active = true;
            newUser.setPassword(registration.password);

            userObject = newUser.toJson();
            userObject._id = new ObjectId(userObject.userid);
            delete userObject.userid;
            getCollection().insert(userObject);

            retrieveUserByUsername(newUser.username, callback);
        }
    });
}

module.exports = {
    User: User,
    retrieveUserById: retrieveUserById,
    retrieveUserByUsername: retrieveUserByUsername,
    registerUser: registerUser
}
