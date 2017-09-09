// Validates User is an admin 
var User        = require('../../models/user');


module.exports = function(req, res, next) {
  if (!(req.decoded))
    res.json({success: false, message: 'need to provide username and password'}).end();
  else if (req.decoded.admin != true)
    res.status(401).send({success: false, message: 'need admin privileges'});
  else
    next();
}
