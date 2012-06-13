var templates = require("./templates");

function Character(config) {
    var params = config || {};
    this.charid = params.id;
    this.name = params.name;
    this.gender = params.gender;
    this.templates = params.templates || {};
    this.knownTemplates = [];
    this.user = params.user;

    templates.retrieveAllTemplates(this._setTemplateDefaults.bind(this));
}

Character.prototype = {
    _setTemplateDefaults: function(err, templates) {
        this.knownTemplates = templates;
        templates.forEach(function(v) {
            var id = v.id;
            if (!this.templates[id]) {
                this.templates[id] = v.initialRank;
            }
        }, this);
    },
    getTemplatesOfType: function(type) {
        var allTemplates = this.knownTemplates;

        return allTemplates.filter(function(v) {
            return type === v.type;
        });
    },
    getTemplateScore: function(t) {
        return this.templates[t.id] || t.minRank;
    },
    getStats: function() {
        var stats = {},
            statTemplates = this.getTemplatesOfType("Stat");

        statTemplates.forEach(function(v) {
            stats[v.name] = this.getTemplateScore(v);
        }, this);
        return stats;
    }
}

function getUserCharacters(user) {
    return [];
}

module.exports = {
    Character: Character,
    getUserCharacters: getUserCharacters
}
