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
  app.post('/count', function(req, res, next) {
    console.log('in \'/count\'');

    //console.log(req);
    console.log('req.body.word =', req.body.word);

    var s1_url = "http://localhost:8080/ServiceA/servicea/myservicea/" + req.body.word;
    var s2_url = "http://localhost:8080/ServiceB/serviceb/myserviceb/" + req.body.word;

    // Call to Service-A
    client.get(s1_url, function (data, response) {
      // parsed response body as js object
      console.log(data);

      // Call to Service-B
      client.get(s2_url, function (data2, response2) {
        // parsed response body as js object
        console.log(data2);

        res.locals = { word: req.body.word,
                       svcA: data.consonantCount,
                       svcB: data2.vowelCount };

        res.render(homeTemplate);
      });
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