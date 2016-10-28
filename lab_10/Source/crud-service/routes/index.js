"use strict";

//
// Module Dependencies
//
var path = require('path');

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

// Connection URL
var url = 'mongodb://admin:password@ds145385.mlab.com:45385/lab_10';

var findAllDocuments = function(db, res, callback) {
    // Get the user collection
    var collection = db.collection('user');
    // Find all users
    collection.find({}).toArray(function(err, docs) {
        assert.equal(err, null);
        console.log("Found the following documents");
        console.dir(docs);
        callback(docs);
    });
};

var findDocument = function(db, query, res, callback) {
    // Get the user collection
    var collection = db.collection('user');
    // query
    console.log('query.email = ' + query.email);
    // Find specific user
    collection.find(query).toArray(function(err, docs) {
        assert.equal(err, null);
        console.log("Found the following document");
        console.dir(docs);
        callback(docs)
    });
};

var insertDocument = function(db, item, res, callback) {
    // Get the documents collection
    var collection = db.collection('user');
    // Insert some documents
    collection.insertOne(item, function(err, result) {
        assert.equal(err, null);
        console.log("Inserted document");
        callback(result);
    });
};

var updateDocument = function(db, key, set, res, callback) {
    // Get the documents collection
    var collection = db.collection('user');
    // Update document where a is 2, set b equal to 1
    collection.updateOne(key , set, function(err, result) {
            assert.equal(err, null);
            assert.equal(1, result.result.n);
            console.log("Updated document");
            callback(result);
        });
};

var deleteDocument = function(db, key, res, callback) {
    // Get the documents collection
    var collection = db.collection('user');
    // Insert some documents
    collection.deleteOne(key, function(err, result) {
        assert.equal(err, null);
        assert.equal(1, result.result.n);
        console.log("Deleted document");
        callback(result);
    });
}

//
// Expose
//
module.exports = function(app) {

    // Layouts
    var baseLayout = path.join(app.settings.layoutsDir, 'layout');
    // Templates
    var loginTemplate = path.join(app.settings.templatesDir, 'login');
    var signupTemplate = path.join(app.settings.templatesDir, 'signup');
    var usersTemplate = path.join(app.settings.templatesDir, 'users');
    var userDetailsTemplate = path.join(app.settings.templatesDir, 'user_details');

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

    /* POST signup page. */
    app.post('/signup', function(req, res, next) {
        console.log('in post \'/signup\'');

        console.log('req.body.firstName =', req.body.firstName);

        // Use connect method to connect to the Server
        MongoClient.connect(url, function(err, db) {
            assert.equal(null, err);
            console.log("Connected correctly to server");

            var item = { email: req.body.email,
                         firstName: req.body.firstName,
                         lastName : req.body.lastName,
                         address: req.body.address,
                         city: req.body.city,
                         state: req.body.state,
                         zip: req.body.zip,
                         phone: req.body.phone };

            // Save
            insertDocument(db, item, res, function(){
                db.close();

                // redirect to users
                res.redirect('/users');
            });

        });
    });

    /* GET users page. */
    app.get('/users', function(req, res, next) {
        console.log('in \'/users\'');

        // fetch all users
        // Use connect method to connect to the Server
        MongoClient.connect(url, function(err, db) {
            assert.equal(null, err);
            console.log("Connected correctly to server");

            findAllDocuments(db, res, function(docs) {
                db.close();

                // loop
                var rows = null;
                for(var i = 0; i < docs.length; i++) {


                    rows = rows != null
                           ?
                            rows +
                            "<tr>" +
                            "<td><a href=\"/user_details?user=" + docs[i].email + "\">" + docs[i].firstName + "</a></td>" +
                            "<td>" + docs[i].lastName + "</td>" +
                            "<td>" + docs[i].email + "</td>" +
                            "</tr>"
                           :
                            "<tr>" +
                            "<td><a href=\"/user_details?user=" + docs[i].email + "\">" + docs[i].firstName + "</a></td>" +
                            "<td>" + docs[i].lastName + "</td>" +
                            "<td>" + docs[i].email + "</td>" +
                            "</tr>";
                }

                res.locals.tableRows = rows;

                res.render(usersTemplate);
            });
        });
    });

    /* GET user_detail page. */
    app.get('/user_details', function(req, res, next) {
        console.log('in \'/user_details\'');

        // console.log(req);
        console.log("req.query.user = ", req.query.user);

        // Use connect method to connect to the Server
        MongoClient.connect(url, function(err, db) {
            assert.equal(null, err);
            console.log("Connected correctly to server");

            var query = {email: req.query.user};
            findDocument(db, query, res, function(docs) {
                db.close();

                console.log('address = ' + docs[0].address);

                res.locals.email = docs[0].email;
                res.locals.firstName = docs[0].firstName;
                res.locals.lastName = docs[0].lastName;
                res.locals.address = docs[0].address;
                res.locals.city = docs[0].city;
                res.locals.state = docs[0].state;
                res.locals.zip = docs[0].zip;
                res.locals.phone = docs[0].phone;

                res.render(userDetailsTemplate);
            });
        });
    });

    /* GET delete_user page. */
    app.post('/delete_user', function(req, res, next) {
        console.log('in \'/delete_user\'');

        console.log("req.body.email = ", req.body.email);

        // Use connect method to connect to the Server
        MongoClient.connect(url, function(err, db) {
            assert.equal(null, err);
            console.log("Connected correctly to server");

            var key = { email: req.body.email };

            // Delete
            deleteDocument(db, key, res, function(result){
                db.close();

                // redirect to users
                res.redirect('/users');
            });

        });

    });

    /* GET update_user page. */
    app.post('/update_user', function(req, res, next) {
        console.log('in \'/update_user\'');

        console.log("req.body.email = ", req.body.email);

        // Use connect method to connect to the Server
        MongoClient.connect(url, function(err, db) {
            assert.equal(null, err);
            console.log("Connected correctly to server");

            var key = { email: req.body.email };
            var set = {$set: {firstName: req.body.firstName,
                              lastName: req.body.lastName,
                              address: req.body.address,
                              city: req.body.city,
                              state: req.body.state,
                              zip: req.body.zip,
                              phone: req.body.phone} };

            // Update
            updateDocument(db, key, set, res, function(result){
                db.close();

                // redirect to users
                res.redirect('/users');
            });

        });
    });

    /* Post read page. */
    app.post('/read', function(req, res, next) {
        console.log('in \'/read\'');

        // console.log(req);
        console.log('req.body.email=' + req.body.email);

        // Use connect method to connect to the Server
        MongoClient.connect(url, function(err, db) {
            assert.equal(null, err);
            console.log("Connected correctly to server");

            var query = {email: req.body.email};
            findDocument(db, query, res, function(docs) {
                if(docs.length > 0) {
                    console.log('registered');
                    findAllDocuments(db, res, function(docs) {
                        db.close();

                        console.log('redirect.. ');
                        // return res.redirect('/users');
                        //   return '/users';
                        res.redirect('/users');
                    });
                }
                else {
                    db.close();
                    console.log('not registered');
                    console.log('redirect..');
                    res.redirect('/signup');
                }
            });

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
    if(app.get('env') === 'development') {
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