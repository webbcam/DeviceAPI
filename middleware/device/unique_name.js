// Validates Device-name is Unique
// Token middleware must be called before this function
var Device        = require('../../models/device');

module.exports = function(req, res, next) {
  if (!(req.body.new_devname))
    res.json({success: false, message: 'need to provide device name'}).end();
  else if (!(req.decoded))
    throw new Error('Need valid token to create device');
  else {
    Device.getDeviceByName(req.decoded.dbID, req.body.new_devname)
    .then(function(device) {
      res.json({success: false, message: "device already exists" }).end();
    })
    //  Device should not exist
    .catch(function(err) {
      req.v_devname = req.body.new_devname;
      next();
    });
  }
}
