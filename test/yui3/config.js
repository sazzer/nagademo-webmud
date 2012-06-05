var path = require("path");

module.exports = {
    "groups": {
        "vows": {
            "base": path.join(__dirname, "../../webapp/yui3/"),
            "modules": {
                "webmud-character-stats": {
                    "path": "characters/statistics.js"
                }
            }
        }
    }
};


