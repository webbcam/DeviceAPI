//  Check for valid device type
var Device        = require('../../models/device');

var actions       = require('../../helpers/deviceparams').actions;

module.exports = function(req, res, next) {
  if (!(req.body.devtype))
    res.json({success: false, message: 'need to provide device-type'}).end();
  else if (!actions[req.body.devtype])
    res.json({success: false, message: 'need to provide valid device type'}).end();
  else {
    req.devtype = req.body.devtype;
    next();
  }
}

