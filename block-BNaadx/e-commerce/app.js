var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var session = require('express-session');
var MongoStore = require('connect-mongo');
var flash = require('connect-flash');
require('dotenv').config();



mongoose.connect(
  'mongodb://localhost:27017/e-commerce',
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    console.log(err ? err : 'Connected to Database');
  }
);

   
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var productRouter = require("./routes/product");

require("dotenv").config();
console.log(process.env.SECRET);

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(flash());

app.use(
  session({
    secret: 'somerandomsecret',
    saveUninitialized: false,
    resave: false,
    store: MongoStore.create({
      mongoUrl: 'mongodb://localhost:27017/assigment',
    }),
  })
);

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/products", productRouter);

module.exports = app;
