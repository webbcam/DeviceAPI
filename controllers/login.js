var express     = require('express');
var router      = express.Router();
var jwt         = require('jsonwebtoken');

//var Code        = require('../models/code');
var User        = require('../models/user');
var config      = require('../configs/config'); 

const expirationTime = 60*60*24;


//  Use Validation middleware
//var middleware = require('../middleware/user')({'login':true});
var middleware = [ require('../middleware/user/username'), require('../middleware/user/password') ];

//  POST to /login
router.get('/', middleware, function(req, res) {
  var username = req.username;
  var password = req.password;

  User.validateUser(username, password).then(function(user) {
    var token = jwt.sign({ 'username': user.username, _id: user._id},
      config.secret, {expiresIn: expirationTime}); 
    console.log("Generated token with id: " + user._id);

    return res.json({
      success: true,
      message: 'Enjoy your token!',
      token: token
    });
  })
  .catch(function(err) {
    console.log(err.message);
    res.json({success: false, message: err.mesage}).end();
  });

  /*
  user = req.user;

  var token = jwt.sign({ 'username': user.username, _id: user._id},
    config.secret, {expiresIn: expirationTime}); 
  console.log("Generated token with id: " + user._id);

  return res.json({
    success: true,
    message: 'Enjoy your token!',
    token: token
  });
  */
});   //  POST to /login

module.exports = router
