var express     = require('express');
var router      = express.Router();
var bodyParser  = require('body-parser');

router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());

//router.use('/', require('./register'));
router.use('/account', require('./account'));
router.use('/login', require('./login'));
router.use('/members', require('./members'));
router.use('/devices', require('./devices'));
//router.use('/', require('./addmember'));
//router.use('/', require('./delmember'));
router.all('/', function(req, res) {
  res.json({message: 'must login to use API (cjwebb.io/login)'});
});

module.exports = router;
