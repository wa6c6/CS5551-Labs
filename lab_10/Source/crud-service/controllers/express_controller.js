"use strict";

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


//
// Expose
//
module.exports = function(app) {

    // locations
    app.set('layoutsDir', path.join(app.settings.views, '/layouts'));
//    app.set('partialsDir', path.join(app.settings.views, '/partials'));
    app.set('templatesDir', path.join(app.settings.views, '/templates'));
    // view engine setup
    app.set('view engine', 'html'); // use .html extension for templates
    app.set('layout', path.join(app.settings.layoutsDir, 'layout'));    // use layout.html as the default layout
    app.enable('view cache');
    app.engine('html', require('hogan-express'));
    // uncomment after placing your favicon in /public
    //app.use(favicon(__dirname + '/public/favicon.ico'));
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false}));

//    app.use(require('less-middleware')(path.join(__dirname, '../public')));
    app.use(express.static(path.join(__dirname, '../public')));

};