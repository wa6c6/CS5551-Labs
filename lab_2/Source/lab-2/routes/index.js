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
    var homeTemplate     = path.join(app.settings.templatesDir, 'home');
    var loginTemplate    = path.join(app.settings.templatesDir, 'login');
    var registerTemplate = path.join(app.settings.templatesDir, 'register');


    /* GET home page. */
    app.get('/', function(req, res, next) {
        // console.log('in \'/\'');
        res.render(loginTemplate);
    });

    app.post('/login', function(req, res) {
        // console.log('in \'/login\'');
            return res.redirect('/login');
        }
    );

    /* GET register page. */
    app.get('/register', function(req, res, next) {
        // console.log('in \'/register\'');
        res.render(registerTemplate);
    });

    app.post('/register', function(req, res) {
            return res.redirect('/');
        }
    );

    /* GET home page. */
    app.get('/home', function(req, res, next) {
        // res.render(homeTemplate, {layout: 'home_layout'});
        res.render(homeTemplate);
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
}