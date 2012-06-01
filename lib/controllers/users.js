function retrieveUserById(userid, callback) {
    console.log("Received message: user:retrieveUserbyId: " + userid);
    var userDetails = {
        username: "sazzer",
        email: "graham@grahamcox.co.uk"
    };
    callback(userDetails);
    
}

module.exports.handlers = {
    retrieveUserById: retrieveUserById
}
