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
    var s1;
    var s2;

//    client.get("http://localhost:8080/RESTExample/restexample/ctofservice", function (data, response) {
    client.get("http://localhost:8080/ServiceA/servicea/myservicea", function (data, response) {
      // parsed response body as js object
      console.log(data);

      // console.log(data.ctofservice.celsius[0]);
      // s1 = data.ctofservice.celsius[0];
      console.log(data.value);
      // s1 = data.value;

        // client.get("http://localhost:8080/RESTExample/restexample/ftocservice", function (data2, response2) {
        client.get("http://localhost:8080/ServiceB/serviceb/myserviceb", function (data2, response2) {
          // parsed response body as js object
          console.log(data2);

          // s2 = data2['F Value'];
          // s2 = data2.value;

          res.locals = { svcA: data.value,
                         svcB: data2.value };

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