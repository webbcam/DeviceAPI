// Check for devicename parameter
var Device        = require('../../models/device');

module.exports = function(req, res, next) {
  if (!(req.body.devID))
    res.json({success: false, message: 'need to provide device-ID'}).end();
  else {
    req.devID = req.body.devID;
    next();
  }
}
