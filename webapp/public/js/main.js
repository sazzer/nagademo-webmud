require(["user", "views/login/login"], function(user, loginView) {
    user.load(function(err, user) {
        alert(user.username);
    });
});
