// var express = require('express');
// var router = express.Router();

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
    var homeTemplate     = path.join(app.settings.templatesDir, 'home');
    var loginTemplate    = path.join(app.settings.templatesDir, 'login');
    var registerTemplate = path.join(app.settings.templatesDir, 'register');


    /* GET home page. */
    app.get('/', function(req, res, next) {
        //res.render('index', { title: 'Express' });
        console.log('in \'/\'');

//        res.render(homeTemplate, {title: 'Lab-1'});
        res.render(loginTemplate);
    });

    // Need to provide better error handling, see the following:
    // http://stackoverflow.com/questions/15711127/express-passport-node-js-error-handling
    app.post('/login', function(req, res) {
            // Successful auth, also note that passport sets the "user" JSON object found in db onto the req.
            console.log('req.body = ' + req.body);
            console.log('res = ' + req);
            // if(req.user.TYPE_CD == 1) { //'educator'
            //     return res.redirect('/educator_dashboard');
            // } else if(req.user.TYPE_CD == 2) {  //'student'
            //     return res.redirect('/student_dashboard');
            // }

            // update to some error page..
            return res.redirect('/login');
        }
    );

    /* GET register page. */
    app.get('/register', function(req, res, next) {
        //res.render('index', { title: 'Express' });
        console.log('in \'/register\'');

        res.render(registerTemplate);
    });

    // Need to provide better error handling, see the following:
    // http://stackoverflow.com/questions/15711127/express-passport-node-js-error-handling
    app.post('/register', function(req, res) {
            // Successful auth, also note that passport sets the "user" JSON object found in db onto the req.
            console.log('req.body = ' + req.body);
            console.log('res = ' + req);
            // if(req.user.TYPE_CD == 1) { //'educator'
            //     return res.redirect('/educator_dashboard');
            // } else if(req.user.TYPE_CD == 2) {  //'student'
            //     return res.redirect('/student_dashboard');
            // }

            // update to some error page..
            return res.redirect('/');
        }
    );

    /* GET home page. */
    app.get('/home', function(req, res, next) {
        //res.render('index', { title: 'Express' });
        console.log('in \'/home\'');
        console.log('homeTemplate=' + homeTemplate);

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
