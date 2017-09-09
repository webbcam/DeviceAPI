// Check for username parameter
var User        = require('../../models/user');

module.exports = function(req, res, next) {
  if (!(req.body.username))
    res.json({success: false, message: 'need to provide username'}).end();
  else {
    req.username = req.body.username;
    next();
  }
}
