var express = require('express');
var unirest = require('unirest');
var LanguageTranslatorV2 = require('watson-developer-cloud/language-translator/v2');

var language_translator = new LanguageTranslatorV2({
    "url": "https://gateway.watsonplatform.net/language-translator/api",
    "password": "7YvmbvmNbsQ2",
    "username": "65842592-ed24-41f0-8d0f-1c2ef028d01f"
});

var router = express.Router();

/* GET Translation */
router.get('/xlate', function(req, res, next) {

  console.log('in \'/xlate\'');
  console.log(req.body);
  // console.log(req.body.text);

  // JSON Request
  //{   text: 'Hello, my name is Wayne.',
  //  source: 'en',
  //  target: 'es' }
  var content = req.body;

  // These code snippets use an open-source library. http://unirest.io/nodejs
  unirest.post("https://neutrinoapi-bad-word-filter.p.mashape.com/bad-word-filter")
      .header("X-Mashape-Key", "iL6mqrNdl7mshpOVMhhgXaqB6zMFp1IkbndjsnCiU61AOS2EpQ")
      .header("Content-Type", "application/x-www-form-urlencoded")
      .header("Accept", "application/json")
      .send("censor-character=*")
      .send("content=" + content.text)
      .end(function (result) {

    // console.log(result.status, result.headers, result.body);
    console.log(result.body);
    // console.log(result.body['censored-content']);

    // update with censored content
    content.text = result.body['censored-content'];

    language_translator.translate(//{
            // text: 'A sentence must have a verb', source : 'en', target: 'es' },
            //   req.body,
              content,
              function (err, translation) {

       if (err) {
         console.log('error:', err);
       }
       else {
         console.log(JSON.stringify(translation, null, 2));
       }

       //res.json(JSON.stringify(translation, null, 2))
       res.json(translation)
     });

     // res.render('index', { title: 'Express' });
  });

});

module.exports = router;
