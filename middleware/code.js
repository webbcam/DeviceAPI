// Validates Code exists & is inactive
var Code        = require('../models/code');

module.exports = function(req, res, next) {
  if (!(req.body.code))
    res.json({success: false, message: 'need to provide code for account'}).end();
  else {
    Code.validateCode(req.body.code)
    .then(function(code) {
      req.code = code;
      next();
    })
    .catch(function(err) {
      console.log(err.message);
      res.json({success: false, message: err.message }).end();
    });
  }
}
