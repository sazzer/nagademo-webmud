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
    getMiscTemplates: function() {
        var allTemplates = this.knownTemplates;

        return allTemplates.filter(function(v) {
            return v.type != "Stat" && v.type != "Skill";
        });
    },
    getAvailableTemplates: function() {
        return this.getMiscTemplates();
    },
    getTemplateScore: function(t) {
        return this.templates[t.id] || t.minRank;
    },
    getStats: function() {
        return this.getTemplateScoresOfType("Stat");
    },
    getSkills: function() {
        return this.getTemplateScoresOfType("Skill");
    },
    getMiscTemplateScores: function() {
        var stats = [],
            statTemplates = this.getMiscTemplates();

        statTemplates.forEach(function(v) {
            var score = this.getTemplateScore(v);
            if (score > 0) {
                stats.push({template: v, score: score});
            }
        }, this);
        return stats;
    },
    getTemplateScoresOfType: function(type) {
        var stats = {},
            statTemplates = this.getTemplatesOfType(type);

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
