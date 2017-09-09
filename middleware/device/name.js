// Check for devicename parameter
var Device        = require('../../models/device');

module.exports = function(req, res, next) {
  if (!(req.body.devname))
    res.json({success: false, message: 'need to provide device-name'}).end();
  else {
    req.devname = req.body.devname;
    next();
  }
}
