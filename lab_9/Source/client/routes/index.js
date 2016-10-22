"use strict";

//
// Module Dependencies
//
var path = require('path');

var Client = require('node-rest-client').Client;
var client = new Client();

//
// Expose
//
module.exports = function(app) {

  // Layouts
  var baseLayout = path.join(app.settings.layoutsDir, 'layout');
  // Templates
  var homeTemplate = path.join(app.settings.templatesDir, 'home');

  /* GET home page. */
  app.get('/', function(req, res, next) {
    console.log('in \'/\'');

    res.render(homeTemplate);
  });

  /* POST Count page. */
  app.post('/xlate', function(req, res, next) {
    console.log('in \'/xlate\'');

    //console.log(req);
    console.log('req.body.txt =', req.body.txt);
    // console.log('req.body.src =', req.body.src);
    // console.log('req.body.tgt =', req.body.tgt);

    // set content-type header and data as json in args parameter
    var args = { data: { text: req.body.txt,
                         source: 'en', //req.body.src,
                         target: 'es'  //req.body.tgt
                       },
                 headers: { "Content-Type": "application/json" }
               };
    console.log(args);

    // Call to Private-Service
   client.get('http://localhost:3000/xlate', args, function (data2, response2) {
      // parsed response body as js object
     console.log(data2);
     console.log(data2.translations[0].translation);
     //
       res.locals = { txt: req.body.txt,
                      xtxt: data2.translations[0].translation };

      res.render(homeTemplate);
   });

  });


  // error handlers


  // development error handler
  // will print stacktrace
  if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
      res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: err
      });
    });
  }

  // production error handler
  // no stacktraces leaked to user
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: {}
    });
  });
};