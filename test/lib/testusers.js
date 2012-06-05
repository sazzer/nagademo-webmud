/**
 * Test cases to test the User management functions
 */

var vows = require("vows"),
    assert = require("assert"),
    horaa = require("horaa"),
    users = require("../../lib/users");

var datastore = horaa("../../../lib/datastore");

vows.describe("User Management").addBatch({
    "Compare passwords": {
        topic: function() {
            var user = new users.User();
            user.setPassword("password");
            return user;
        },
        "Hashed passwords compare correctly": function(user) {
            assert.isTrue(user.comparePassword("password"));
        },
        "Comparing with hashed password fails": function(user) {
            assert.isFalse(user.comparePassword(user.hashedPassword));
        },
        "Password actually gets hashed": function(user) {
            assert.notEqual("password", user.hashedPassword);
        }
    },
    "USER.toJson": {
        topic: function() {
            var user = new users.User();
            user.setPassword("password");
            return user;
        },
        "JSON contains expected fields": function(user) {
            assert.include(Object.keys(user), "userid");
            assert.include(Object.keys(user), "username");
            assert.include(Object.keys(user), "email");
            assert.include(Object.keys(user), "hashedPassword");
            assert.include(Object.keys(user), "registered");
            assert.include(Object.keys(user), "updated");
            assert.include(Object.keys(user), "active");
            assert.equal(7, Object.keys(user).length);
        },
        "JSON doesn't contain any functions": function(user) {
            var user = new users.User();
            var json = user.toJson();
            for (var key in json) {
                assert.isFalse(json[key] instanceof Function);
            }
        }
    },
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

