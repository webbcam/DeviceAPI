// Check for description parameter
var Device        = require('../../models/device');

module.exports = function(req, res, next) {
  if (!(req.body.devdesc))
    res.json({success: false, message: 'need to provide device description'}).end();
  else {
    req.devdesc = req.body.devdesc;
    next();
  }
}
