var express = require('express');
var router = express.Router();

var main_server = require('../tools/main_server.js');

/* GET home listing. */
router.get('/', function(req, res, next) {
  res.render('index.html');
    console.log('street: ' + req.body);
});


router.post('/', function(req, res, next) {
  //console.log("press post");
  //res.render('index.html');
  //  console.log('street: ' + req.body.street);
  //  console.log('city: ' + req.body.city);
  //main_server.process_form(req, res);
  //    console.log('street: ' + req.body);
});

module.exports = router;
