var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
var dataRouter = require('./routes/dataroute');
var productRouter = require('./routes/productroute');
var cartRouter=require('./routes/cartroute')
require('dotenv').config();


const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/ecom', { useNewUrlParser: true, useUnifiedTopology: true ,  useFindAndModify: false});

var app = express();

// CORS configuration
const corsOptions = {
  origin: 'http://localhost:4200', // Allow your frontend origin
  methods: 'GET,POST,PUT,DELETE',  // Allow HTTP methods
  allowedHeaders: 'Content-Type,Authorization' // Allow headers
};
app.use(cors(corsOptions));

// view engine setup (if needed)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Middleware setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/user', dataRouter);
app.use('/product', productRouter);
app.use('/cart', cartRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
