'use strict';
// dependencies setup
const express = require('express');
const mongoose = require('mongoose');
const request = require('request');
const router = express.Router();

// required configuration
const config = require('../config/setting');
const HTTPCode = require('../config/HTTPResponseCode');
const Common = require('../common');
const errorFormatter = Common.errorFormatter;
const resultFormatter = Common.resultFormatter;

// require models
const User = require('../models/user');
const Product = require('../models/product');

// required validation check & filter
const { check, validationResult } = require('express-validator/check');
const { sanitize } = require('express-validator/filter');

/* GET HOME */
router.get('/', [], (req, res) => res.send('All products will list here'));

/* GET PRODUCTS DETAILS */
router.get('/all', async (req, res) => {
  try {

    // extract product data from db
    let result = await Product.find({
      status: 'active'
    }, config.commonFieldsToExclude);

    // send result back
    res.json({ 
      code:`0000`,
      message:``,
      result 
    });
  } catch (error) {
    console.log('get product catch error->', error);
    let message = error.message ? error.message : HTTPCode.badRequest.message;
    let resCode = error.code ? error.code : HTTPCode.badRequest.code;
    return res.status(resCode).json({
      code:`404`,
      message
    });
  }
});

module.exports = router;