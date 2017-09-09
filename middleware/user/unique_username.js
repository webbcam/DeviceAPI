// Validates Username is Unique
var User        = require('../../models/user');

module.exports = function(req, res, next) {
  if (!(req.body.new_username))
    res.json({success: false, message: 'need to provide username'}).end();
  else {
    User.getUser(req.body.new_username)
    .then(function(user) {
      console.log("error: user " + user.username + " already exists");
      res.json({success: false, message: "username already taken" }).end();
    })
    //  User should not exist
    .catch(function(err) {
      req.v_username = req.body.new_username;
      next();
    });
  }
}
