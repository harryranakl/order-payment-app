'use strict';
// dependencies setup
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

// required configuration
const config = require('../config/setting');
const HTTPCode = require('../config/HTTPResponseCode');
const Common = require('../common');
const errorFormatter = Common.errorFormatter;

// require models
const Payment = require('../models/payment');

// required validation check & filter
const { check, validationResult } = require('express-validator/check');
const { sanitize } = require('express-validator/filter');

const allPaymentStates = [
  'confirmed',
  'cancelled'
]

/* GET HOME */
router.get('/', [], (req, res) => res.send('All payemnts will list here'));

/* RECEIVE PAYMENT FOR ORDER */
router.post('/', [
  check('order', 'Invalid order supplied')
    .isMongoId(),
  check('mode', 'Invalid mode supplied')
    .isIn(['cash', 'cheque']),
  check('amount', 'Amount must be greater than zero')
    .custom(async (value, { req }) => value > 0),
  sanitize('order').trim().customSanitizer(value => mongoose.Types.ObjectId(value)),
  sanitize('mode').trim(),
  sanitize('amount').trim().toFloat(),
], async (req, res) => {
  try {
    const validRes = validationResult(req).formatWith(errorFormatter);
    if (!validRes.isEmpty())
      throw new Error(validRes.array().join('\n'))

    const randomIndex = Math.floor(Math.random() * allPaymentStates.length);

    const result = await new Payment({
      ...req.body,
      paymentState: allPaymentStates[randomIndex]
    }).save({ new: true });

    // send result back
    res.json({ 
      code:`0000`,
      message:``,
      result 
    });
  } catch (error) {
    console.log('payment api catch error->', error);
    let message = error.message ? error.message : HTTPCode.badRequest.message;
    let resCode = error.code ? error.code : HTTPCode.badRequest.code;
    return res.status(resCode).json({ 
      code:`404`,
      message 
    });
  }
});

module.exports = router;