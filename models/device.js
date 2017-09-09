var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;
var shortid     = require('shortid');

var actions = require('../helpers/deviceparams').actions;

var DeviceSchema = new Schema({
  dbID: { type: String, required: true, index: true },
  deviceID: { type: String, default: shortid.generate },
  name: { type: String, required: true },
  description: { type: String, required: true },
  actions: { type: Array, required: true },
  signal: { type: Number, required: true }
});

DeviceSchema.statics.createDevice = function(dbID, name, description, devicetype ) {
  console.log("Creating device: " + name + ": " + description + ": " + devicetype);
  
  var device = this({
    dbID: dbID,
    name: name,
    description: description,
    actions: actions[devicetype],
    signal: 0x515530 // | 0x3 -> on; | 0xC -> off;
  })

  return device.save()
}

DeviceSchema.statics.removeDevice = function(dbID, deviceID) {
  return this.findOneAndRemove({'dbID': dbID, 'deviceID': deviceID})
    .then(function(result) {
      if (result == null) throw new Error("device does not exist");
      return Promise.resolve(result);
  });
}

DeviceSchema.statics.getDeviceByName = function(dbID, deviceName) {
  return this.findOne({dbID: dbID, name: deviceName})
    .then(function(device) {
      if (device == null) throw new Error('device does not exist');
      return Promise.resolve(device);
    });
}

DeviceSchema.statics.getDeviceByID = function(dbID, deviceID) {
  return this.findOne({dbID: dbID, deviceID: deviceID})
    .then(function(device) {
      if (device == null) throw new Error('device does not exist');
      return Promise.resolve(device);
    });
}

DeviceSchema.statics.getAll = function(dbID) {
  // If no device specified, return all devices on account
  return this.find({dbID: dbID}, function(err, results) {
    //if (err) throw new Error(err.message);
    return Promise.resolve(results);
  });
}

module.exports = mongoose.model('Device', DeviceSchema, 'devices');
