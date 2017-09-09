const uuid      = require('uuid/v1');
const uniqid    = require('uniqid');
var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;

var CodeSchema = new Schema({
  code: { type: String, required: true, index: { unique: true } },
  dbID: { type: String, unique: true},
  activated: { type: Boolean, required: true}
});

CodeSchema.methods.activateCode = function() {
  this.activated = true;
  return this.save();
}

CodeSchema.statics.validateCode = function(code) {
  return this.findOne({code:code})
    .then(function(code) {
      if (code == null) throw new Error('code does not exist');
      if (code.activated) throw new Error('code already activated');
      return Promise.resolve(code);
    });
}

CodeSchema.statics.generateCode = function() {
  var code = this({
    code: uuid(),
    dbID: uniqid(),
    activated: false
  });

  return code.save();
}


module.exports = mongoose.model('Code', CodeSchema, 'codes');
