'use strict';
// dependencies setup
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const logger = require('morgan');
const mongoose = require('mongoose');
const validator = require('express-validator');
const config = require('./config/setting');

const app = express();

mongoose.Promise = global.Promise;
mongoose.connect(config.database, {
	useNewUrlParser: true,
	useFindAndModify: false,
	useCreateIndex: true
}).then(() => {
		console.log('Database is connected')
	},
	err => console.log('Can not connect to the database' + err)
);
// middleware setup
app.use(logger('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(validator());
/*
 * To authorize all request for order endpoint use following method
 * The authorize method need to implement
 **/
const authorize = (req, res, next) => {
	// authorization code need to implement
	return next()
}

// import local route dependencies
const index = require('./routes/index');
const payment = require('./routes/payment');

global.ApiPath = `/api`;
// set local un protected routes
app.use(`${global.ApiPath}/`, index);
// set local protected routes
app.use(`${global.ApiPath}/payment`, authorize, payment);

// do not use any API route after this 404
app.use(global.ApiPath + '/*', (req, res) => res.status(404).json({
  code: `404`,
  message: `The requested URI is not exists`
}));
app.use('/*', (req, res) => res.status(404).send('Not Found'));

module.exports = app.listen(config.port, function () {
	console.log(`Express server running on *: ${config.port}`);
});