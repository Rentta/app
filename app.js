var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var formidable = require('express-formidable');

var routes = require('./routes/index');
var users = require('./routes/users');
var home = require('./routes/home'); //omri

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.engine('html', require('ejs').renderFile);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//app.use(formidable.parse());

app.use('/', routes);
app.use('/users', users);
app.use('/home', home);

// my code temp

//app.use(bodyParser());
//
//app.get('/', function(req, res){
//    res.render('index.html');
//});
//
////var main_server = require('./tools/main_server.js');
//
//app.post('/', function(req, res){
//    var form = new formidable.IncomingForm();
//    form.on('field', function (field, value) {
//        console.log(field);
//        console.log(value);
//        fields[field] = value;
//    });
//    //main_server.process_form(req, res);
//    //var userName = req.body.city;
//    console.log((fields))
//    var html = 'Hello: ' + userName + '.<br>' +
//        '<a href="/">Try again.</a>';
//    res.send(html);
//});


//

// login routes
//var main_server = require('./tools/main_server.js');

//noinspection JSUnresolvedFunction,JSUnresolvedFunction
//app.route('/home')// if change this also change in the html under "action"
//    // show the form (GET http://localhost:8080/login)
//    .get(function(req, res) {
//        res.render('index.html');
//    })
//
//    // process the form (POST http://localhost:8080/login)
//    .post(function(req, res) {
//        var str = main_server.process_form(req, res);
//        console.log('processing' + str);
//
//        res.send('processing the login form!' + str);
//    });






// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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

// my code:


// end of my code


module.exports = app;
// to start server use: SET DEBUG=main_app:* & npm start
