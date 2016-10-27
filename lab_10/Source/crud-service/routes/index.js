"use strict";

//
// Module Dependencies
//
var path = require('path');

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

// Connection URL
var url = 'mongodb://admin:password@ds145385.mlab.com:45385/lab_10';

var findDocuments = function(db, callback) {
  // Get the documents collection
  var collection = db.collection('user');
  // Find some documents
  collection.find({}).toArray(function(err, docs) {
    assert.equal(err, null);
    console.log("Found the following records");
    console.dir(docs);
    callback(docs);
  });
}

//
// Expose
//
module.exports = function(app) {

  // Layouts
  var baseLayout = path.join(app.settings.layoutsDir, 'layout');
  // Templates
  var loginTemplate  = path.join(app.settings.templatesDir, 'login');
  var signupTemplate = path.join(app.settings.templatesDir, 'signup');

  /* GET login page. */
  app.get('/', function(req, res, next) {
    console.log('in \'/\'');

    res.render(loginTemplate);
  });

  /* GET signup page. */
  app.get('/signup', function(req, res, next) {
    console.log('in \'/signup\'');

    res.render(signupTemplate);
  });

  /* GET users page. */
  app.get('/users', function(req, res, next) {
    console.log('in \'/users\'');

    // lists all users in db
    res.render(signupTemplate);
  });

  /* GET user_detail page. */
  app.get('/user_detail', function(req, res, next) {
    console.log('in \'/user_detail\'');

    // displays all user information
    // allow delete/update
    res.render(signupTemplate);
  });

  /* GET  page. */
  app.get('/read', function(req, res, next) {
    console.log('in \'/read\'');

    console.log('req.body.txt =', req.body.txt);

    // Use connect method to connect to the Server
    MongoClient.connect(url, function(err, db) {
      assert.equal(null, err);
      console.log("Connected correctly to server");

      findDocuments(db, function(){

        db.close();

        // If not found
        console.log('redirect..');
        return res.redirect('/signup');
      })
    });

  });

  /* GET  page. */
  app.get('/read', function(req, res, next) {
    console.log('in \'/read\'');

    // Use connect method to connect to the Server
    // MongoClient.connect(url, function(err, db) {
    //   assert.equal(null, err);
    //   console.log("Connected correctly to server");
    //
    //   db.close();
    //
    // });

    // If not found
    console.log('redirect..');
    return res.redirect('/signup');

  });

  //
  // error handlers
  //

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