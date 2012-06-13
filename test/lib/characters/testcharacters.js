/**
 * Test cases to test the User management functions
 */

var vows = require("vows"),
    assert = require("assert"),
    horaa = require("horaa"),
    users = require("../../../lib/users"),
    characters = require("../../../lib/characters/characters");

var datastore = horaa("../../../lib/datastore");

vows.describe("Character Management").addBatch({
    "List Characters": {
        "For new user": {
            topic: function() {
                var user = new users.User();
                user.username = "newuser";
                return characters.getUserCharacters(user);
            },
            "Characters list exists": function(characters) {
                assert.isArray(characters);
            },
            "Characters list is empty": function(characters) {
                assert.lengthOf(characters, 0);
            }
        }
    }
}).export(module);


