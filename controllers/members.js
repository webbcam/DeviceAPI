var express     = require('express');
var router      = express.Router();

var User        = require('../models/user');

var postMiddleware = [ require('../middleware/token'), require('../middleware/user/admin'), require('../middleware/user/unique_username'), require('../middleware/user/valid_password') ]

//  ADD Member
router.post('/', postMiddleware, function(req, res) {
  var accountAdmin = req.decoded;
  var username = req.v_username;
  var password = req.v_password;
  accountAdmin.addMember(username, password).then(function(result) {
    return res.json({success: true, message: 'user: ' + username + ' created successfully' });
  })
  .catch(function(err) {
    console.log("Entered Error");
    return res.json({success: false, message: err.message });
  });
});

var deleteMiddleware = [require('../middleware/token'),
require('../middleware/user/admin'), require('../middleware/user/username')];

//  DELETE Member
router.delete('/', deleteMiddleware, function(req, res) {
  var accountAdmin = req.decoded;
  var username = req.username
  accountAdmin.deleteMember(username).then(function(result) {
    console.log("Del Result: " + result);
    return res.json({success: true, message: 'user: ' + username + ' deleted successfully' });
  })
  .catch(function(err) {
    console.log(err.message);
    return res.status(400).send({ success: false, message: 'user does not exist' });
  });
});

var putMiddleware = [require('../middleware/token'), require('../middleware/user/admin')];

//todo:
//  PUT Member

var getMiddleware = [require('../middleware/token'), require('../middleware/user/admin')];

//  GET Member
router.get('/', getMiddleware, function(req, res) {
  var accountAdmin = req.decoded;
  var username = req.body.username;
  if (username)
    console.log("Username " + username + " provided");

  accountAdmin.getMember(username).then(function(result) {
    return res.json({success: result.length != 0, message: result});
  });
});

module.exports = router;
