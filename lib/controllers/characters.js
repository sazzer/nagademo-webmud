var users = require("../users"),
    winston = require("winston");

function getUserCharacters(userid, callback) {
    var result = {
        characters: []
    };
    callback(result);
}

module.exports.handlers = {
    getUserCharacters: getUserCharacters
}

