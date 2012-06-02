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
            datastore.hijack("retrieveById", function(collection, id, callback) {
                callback(null, {
                    _id: "12345",
                    username: "sazzer",
                    email: "graham@grahamcox.co.uk"
                });
            });
            users.retrieveUserById(12345, this.callback);
            datastore.restore("retrieveById");
        },
        "We didn't get an error": function(err, user) {
            assert.isNull(err);
        },
        "We did get a user": function(err, user) {
            assert.isObject(user);
            assert.instanceOf(user, users.User);
        },
        "We get the correct User ID": function(err, user) {
            assert.equal(user.userid, 12345);
        },
        "We get the correct Username": function(err, user) {
            assert.equal(user.username, "sazzer");
        },
        "We get the correct Email address": function(err, user) {
            assert.equal(user.email, "graham@grahamcox.co.uk");
        }
    }
}).export(module);

