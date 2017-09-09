// Validates Password

module.exports = function(req, res, next) {
  if (!(req.body.new_password))
    res.json({success: false, message: 'need to provide password for user'}).end();
  else {
    /* Could add Password requirements here */
    req.v_password = req.body.new_password;
    next();
  }
}
