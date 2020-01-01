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

const User = require('./models/user');
const Order = require('./models/order');
const Product = require('./models/product');

const app = express();

mongoose.Promise = global.Promise;
mongoose.connect(config.database, {
	useNewUrlParser: true,
	useFindAndModify: false,
	useCreateIndex: true
}).then(() => {
		console.log('Database is connected');

		const userData = [
			{ fullName: "don spike", email: "don@gmail.com", password: "$2a$10$/lEEg10SLIJuRqG4y7.aK.ePIiYN97K87qJElUoNIB.LIlCWRK3DK", status: "active" }
		];
		const productsData = [
		  { title: "Camera", description: "Digital Camera", price: "200", available: true, status: "active" },
		  { title: "Phone", description: "Huwaei Phone", price: "100", available: true, status: "active" },
		  { title: "USB Cable", description: "USB Cable Connector ", price: "10", available: true, status: "active" }
		];

		User.findOne()
		.exec(function (err, u) {
		  if (err) return console.log('user table ->', err);
		  if(!u){
		  		User.collection.insertMany(userData, function (err, docs) {
			      if (err) return console.log('user table ->',err);
			        console.log("data inserted to user table ->");
			    });
		  }
		});

		Product.findOne()
		.exec(function (err, p) {
		  if (err) return console.log('product table ->', err);
		  if(!p){
		  		Product.collection.insertMany(productsData, function (err, docs) {
			      if (err) return console.log('product table ->',err);
			        console.log("data inserted to product table ->");
			    });
		  }
		});

	},
	err => console.log('Can not connect to the database ->' + err)
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
const order = require('./routes/order');
const product = require('./routes/product');

global.ApiPath = `/api`;
// set local un protected routes
app.use(`${global.ApiPath}/`, index);
// set local protected routes
app.use(`${global.ApiPath}/order`, authorize, order);
app.use(`${global.ApiPath}/product`, authorize, product);

// do not use any API route after this 404
app.use(global.ApiPath + '/*', (req, res) => res.status(404).json({
  code: `404`,
  message: `The requested URI is not exists`
}));
app.use('/*', (req, res) => res.status(404).send('Not Found'));

module.exports = app.listen(config.port, function () {
	console.log(`Express server running on *: ${config.port}`);
});