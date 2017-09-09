var express     = require('express');
var app         = express();

var bodyParser  = require('body-parser');
var morgan      = require('morgan');
var mongoose    = require('mongoose');

var config      = require('./configs/config');


mongoose.Promise = global.Promise;

// ====================
// configuration ======
// ====================

var port = process.env.PORT || 8181;

mongoose.connect(config.db_uri, config.db_options);

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(morgan('dev'));

// ====================
// routes =============
// ====================
app.use(require('./controllers'));

// ====================
// start server =======
// ====================
app.listen(port);
console.log("Listening on port: " + port);
