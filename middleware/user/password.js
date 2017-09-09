// Check for password parameter
var User        = require('../../models/user');

module.exports = function(req, res, next) {
  if (!(req.body.password))
    res.json({success: false, message: 'need to provide password'}).end();
  else {
    req.password = req.body.password;
    next();
  }
}

