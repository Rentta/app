var express = require('express');
var router = express.Router();

//var http = require('http');
//var fs = require('fs');
//var formidable = require("formidable");
//var util = require('util');
var jsonfile = require('jsonfile');
var dataapi = require('../tools/data_api.js');
var mongoose = require('mongoose');
var config = require('config');

var mongo_config = config.get('main.mongo');

// declare mongo variables
var server = config.get('main.mongo.host');
var port = config.get('main.mongo.port');
var database_name = config.get('main.mongo.db_name');
var user = config.get('main.mongo.user');
var password = config.get('main.mongo.password');

// start mongo
var uri = 'mongodb://' + user + ':' + password + '@' + server + ':' + port + '/' + database_name;
//var uri = 'mongodb://' + server + ':' + port + '/' + database_name;
var app_mongo = dataapi.mongo_init(mongoose, uri);

/* GET home listing. */
router.get('/', function(req, res, next) {
  res.render('index.html');
});

router.post('/', function(req, res, next) {
  console.log('got Form post req, start saving to mongo');
  //set json to insertion
  var jsonObj = req.body;
  //write json to Mongo:
  var doc_id = dataapi.insert_doc(app_mongo, jsonObj);
  console.log('finish saving form json to mongo');

  //agent = req.body.agent;
  //apt_status = req.body.apt_status;
  //apt_number = req.body.apt_number;
  //balcony = req.body.balcony;
  //city = req.body.city;
  //contract_duration = req.body.contract_duration;
  //email = req.body.email;
  //floor_number = req.body.floor_number;
  //date = req.body.date;
  //opentext = req.body.opentext;
  //front_back = req.body.front_back;
  //furnished = req.body.furnished;
  //house_number = req.body.house_number;
  //parking = req.body.parking;
  //partners = req.body.partners;
  //percentage_rise = req.body.percentage_rise;
  //price = req.body.price;
  //room_number = req.body.room_number;
  //size =  req.body.size;
  //split = req.body.split;
  //street = req.body.street;
  //years_since = req.body.years_since;

  // write json to HD:
  var file_name = '/Users/Omri/Downloads/temp/' + doc_id + '.json';
  console.log('\nwriting json to file on disk\n');
  res.write(file_name);
  jsonfile.writeFileSync(file_name, jsonObj);
  console.log(file_name);
  console.log('\ndone writing json file to disk\n\n');

  res.end("\nyes");

});

module.exports = router;
