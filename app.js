var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');

const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

var jwt = require('jsonwebtoken');

var app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

const agent = require('./src/models/agent');
const purchase = require('./src/models/purchase');
const user = require('./src/models/user');

const loginRoutes = require('./src/routes/login-routes');
app.use('/', loginRoutes);

const revendRoutes = require('./src/routes/revend-routes');
app.use('/', revendRoutes);

const comprasRoutes = require('./src/routes/compras-routes');
app.use('/', comprasRoutes);

const usuariosRoutes = require('./src/routes/usuarios-routes');
app.use('/', usuariosRoutes);

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});


//database em cluster da AWS ou acesso local
mongoose.connect(process.env.DATABASE_CONNECTION_AWS_STRING, {
//mongoose.connect(process.env.DATABASE_CONNECTION_LOCAL_STRING, {
    useUnifiedTopology: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useCreateIndex: true 
});


module.exports = app;
