// var express = require('express');
// var router = express.Router();
//
// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });
//
// module.exports = router;

//
// Module Dependencies
//
var path = require('path');

//
// Expose
//
module.exports = function(app) {

  // Layouts
  var baseLayout = path.join(app.settings.layoutsDir, 'layout');
  // Templates
  var loginTemplate    = path.join(app.settings.templatesDir, 'login');
  var mashupTemplate    = path.join(app.settings.templatesDir, 'mashup');

  /* GET home page. */
  app.get('/', function(req, res, next) {
    console.log('in \'/\'');
    res.render(loginTemplate);
  });

  app.get('/mashup', function(req, res, next) {
    console.log('in \'/mashup\'');
    res.render(mashupTemplate);
  });
}
