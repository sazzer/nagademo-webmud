require(["user", "views/login/login", "views/userarea"], function(user, loginView, userArea) {
    userArea.initialize("#header");

    user.load(function(err, user) {
    });
});
