define(["user"], function(user) {
    var _template = [
        '<div class="currentuser">',
            'Welcome <span class="username"></span>',
            ' | <span class="logout">Log out</span>',
        '</div>'
    ].join("");

    var _currentUserArea;

    function initialize(container) {
        if (!_currentUserArea) {
            _currentUserArea = $(_template);
            _currentUserArea.hide();
            $(container).append(_currentUserArea);

            user.events.loaded.subscribe(function(user) {
                if (user) {
                    _currentUserArea.find(".username").text(user.username);
                    _currentUserArea.show();
                }
                else {
                    _currentUserArea.hide();
                }
            });
        }
    }
    return {
        initialize: initialize
    }
});

