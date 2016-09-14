"use strict";

var express = require('express');
var app = express();

// bootstrap Express
require('./controllers/express_controller')(app);

// bootstrap routes
require('./routes/index')(app);

module.exports = app;
