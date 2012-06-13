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
    _setTemplateDefaults: function(templates) {
        this.knownTemplates = templates;
        templates.forEach(function(v) {
            var id = v.id;
            if (!this.templates[id]) {
                this.templates[id] = v.initialRank;
            }
        });
    }
}

function getUserCharacters(user) {
    return [];
}

module.exports = {
    Character: Character,
    getUserCharacters: getUserCharacters
}
