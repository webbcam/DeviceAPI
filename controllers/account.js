var express     = require('express');
var router      = express.Router();

var Code        = require('../models/code');
var User        = require('../models/user');


//  Use Validation middleware
var postMiddleware = [ require('../middleware/user/unique_username'), require('../middleware/user/valid_password'), require('../middleware/code') ]
//var postMiddleware = [ require('../middleware/username'), require('../middleware/password'),require('../middleware/code') ]

//  POST account
router.post('/', postMiddleware, function(req, res) {
  var code = req.code;
  var username = req.v_username;
  var password = req.v_password;

  //  Activate Code and Create User
  Promise.all([ 
    code.activateCode(), 
    User.createUser(username, password, true, code.dbID) 
  ]) .then(
  // success
  function(result) {
    return res.json({success: true, message: 'user: ' + username + ' created successfully' });
  },
  // fail
  function(err) {
    return res.json({success: false, message: err.message });
  });
}); 

var putMiddleware = [ require('../middleware/token'), require('../middleware/user/admin'), require('../middleware/user/password'), require('../middleware/user/valid_password') ]
//var putMiddleware = [ require('../middleware/token'), require('../middleware/admin'), require('../middleware/password') ]

//  PUT account
router.put('/', putMiddleware, function(req, res) {
  var adminUser = req.decoded;
  var oldPassword = req.password;
  var newPassword = req.v_password;
  // Verify Current Password
  //adminUser.comparePassword(req.password);

  adminUser.updatePassword(newPassword).then(function(result) {
    return res.json({success: true, message: "Successfully changed password for " + adminUser.username});
  })
  .catch(function(err) {
    res.json({success:false, message: err.message});
  });

});


module.exports = router;
