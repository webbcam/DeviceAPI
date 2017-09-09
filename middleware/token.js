// Validates token
var User        = require('../models/user');
var jwt         = require('jsonwebtoken');
var config      = require('../configs/config'); 

module.exports = function(req, res, next) {
  var token = req.body.token || req.headers['x-access-token'];
  if (!token)
    res.status(403).send({ success: false, message: 'no token provided' });
  else {
    try {
      var decoded = jwt.verify(token, config.secret);
    } catch (err) {
      return res.status(401).send({ success: false, message: 'failed to authenticate token' });
    }

    User.getUser(decoded.username).then(function(user) {
      if (decoded._id != user._id) {
        console.log("decoded.id (" + decoded._id + ") != user.id (" + user._id + ")");
        throw new Error("invalid user id");
      }
      req.decoded = user;
      next();
    })
    .catch(function(err) {
      console.log(err.message);
      return res.status(401).send({ success: false, message: 'failed to authenticate token' });
    });
  }
}


