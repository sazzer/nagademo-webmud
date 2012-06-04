/**
 * Test cases to test the User management functions
 */

var vows = require("vows"),
    assert = require("assert"),
    horaa = require("horaa"),
    users = require("../lib/users");

var datastore = horaa("../../../lib/datastore");

vows.describe("User Management").addBatch({
    "Loading an existing user": {
        topic: function() {
            var usersCollection = {
                findOne: function(query, callback) {
                    callback(undefined, {
                        _id: "4fccfca50000000111000003",
                        username: "sazzer",
                        email: "graham@grahamcox.co.uk"
                    });
                }
            };
            datastore.hijack("getCollection", function(collection) {
                return usersCollection;
            });
            users.retrieveUserById("4fccfca50000000111000003", this.callback);
            datastore.restore("getCollection");
        },
        "We didn't get an error": function(err, user) {
            assert.isNull(err);
        },
        "We did get a user": function(err, user) {
            assert.isObject(user);
            assert.instanceOf(user, users.User);
        },
        "We get the correct User ID": function(err, user) {
            assert.equal(user.userid, "4fccfca50000000111000003");
        },
        "We get the correct Username": function(err, user) {
            assert.equal(user.username, "sazzer");
        },
        "We get the correct Email address": function(err, user) {
            assert.equal(user.email, "graham@grahamcox.co.uk");
        }
    },
    "Loading an unknown user": {
        topic: function() {
            var usersCollection = {
                findOne: function(query, callback) {
                    callback(undefined, undefined);
                }
            };
            datastore.hijack("getCollection", function(collection) {
                return usersCollection;
            });
            users.retrieveUserById("4fccfca50000000111000003", this.callback);
            datastore.restore("getCollection");
        },
        "We didn't get an error": function(err, user) {
            assert.isNull(err);
        },
        "We didn't get a user": function(err, user) {
            assert.isNull(user);
        }
    }
}).export(module);

