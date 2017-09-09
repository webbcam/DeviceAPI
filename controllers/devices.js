var express     = require('express');
var router      = express.Router();

var Device      = require('../models/device');

//  ADD Device
//var postMiddleware = [ require('../middleware/token'), require('../middleware/device')({fname: {unique: true}, fdesc: true, dtype: true})];
var postMiddleware = [ require('../middleware/token'), require('../middleware/user/admin'), require('../middleware/device/unique_name'), require('../middleware/device/description'), require('../middleware/device/type')];

router.post('/', postMiddleware, function(req, res) {
  var adminUser = req.decoded;
  var devName = req.v_devname;
  var devDesc = req.devdesc;
  var devType = req.devtype;
  return Device.createDevice(adminUser.dbID, devName, devDesc,
  devType).then(function(result) {
    console.log("CreateDevice: " + result);
    return res.json({success: true, message: "Device " + devName + " created", device: result});
  })
  .catch(function(err) {
    console.log("CreateDevice-error: " + err.message);
    return res.json({success: false, message: err.message});
  });
});

//  Remove Device
//var deleteMiddleware = [ require('../middleware/token'), require('../middleware/device')({deviceID: true})]
var deleteMiddleware = [ require('../middleware/token'), require('../middleware/device/id')];

router.delete('/', deleteMiddleware, function(req, res) {
  var adminUser = req.decoded;
  var devID = req.devID;

  return Device.removeDevice(adminUser.dbID, devID)
    .then(function(result) {
      console.log("Successfully deleted device " + result);
      return res.json({success: true, message: "deleted device " + result.name});
    })
    .catch(function(err) {
      console.log("Error: " + err.message);
      return res.json({success: false, message: err.message});
    });
});

//  Get Device
//var getMiddleware = [ require('../middleware/token'), require('../middleware/device')({deviceID: false})];
var getMiddleware = [ require('../middleware/token')];

router.get('/', getMiddleware, function(req, res) {
  var adminUser = req.decoded;
  var devID = req.body.devID;
  var devName = req.body.devname;
// Device by ID
  if (devID) {
    return Device.getDeviceByID(adminUser.dbID, devID)
      .then(function(result) {
        return res.json({success: true, message: result});
      })
      .catch(function(err) {
        console.log("Error: " + err.message);
        return res.json({success: false, message: err.message});
      });
// Device by Name
  } else if (devName) {
    return Device.getDeviceByName(adminUser.dbID, devName)
      .then(function(result) {
        return res.json({success: true, message: result});
      })
      .catch(function(err) {
        console.log("Error: " + err.message);
        return res.json({success: false, message: err.message});
      });
// ALL Devices
  } else {
    return Device.getAll(adminUser.dbID)
      .then(function(result) {
        return res.json({success: true, message: result});
      })
      .catch(function(err) {
        console.log("Error: " + err.message);
        return res.json({success: false, message: err.message});
      });
  }
});
module.exports = router;
