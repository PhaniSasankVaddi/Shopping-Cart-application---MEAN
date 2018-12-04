//adding express package for http connections
var express = require('express');
var app = express();

//adding mongoose db connection
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/FruitShelf');

//add bodyparser to accept in any i/p lang
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

//adding cross origin
var cors = require('cors');
app.use(cors('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
}));

//add routing
var userRoute = require('./routes/user_action');
var adminRoute = require('./routes/admin_action');
app.use('/',userRoute);
app.use('/admin',adminRoute);


//add port on which app is running
var port = process.env.PORT || 8080
app.listen(port);
console.log('Application running on port ' +port);

//handling errors
var createError = require('http-errors');
app.use(function(req, res, next) {
  next(createError(404));
});

module.exports = app;