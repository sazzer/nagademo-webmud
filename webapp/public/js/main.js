require(["user", "views/login/login", "views/userarea"], function(user, LoginView, userArea) {
    userArea.initialize("#header");

    var _loginView;

    user.load(function(err, user) {
        _loginView = new LoginView("#body");
    });
});
