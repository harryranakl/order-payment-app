'use strict';
// dependencies setup
const express = require('express');
const mongoose = require('mongoose');
const request = require('request');
const axios = require('axios');
const router = express.Router();

// required configuration
const config = require('../config/setting');
const HTTPCode = require('../config/HTTPResponseCode');
const Common = require('../common');
const errorFormatter = Common.errorFormatter;
const resultFormatter = Common.resultFormatter;

// require models
const User = require('../models/user');
const Order = require('../models/order');
const Product = require('../models/product');

// required validation check & filter
const { check, validationResult } = require('express-validator/check');
const { sanitize } = require('express-validator/filter');

/* GET HOME */
router.get('/', [], (req, res) => res.send('All orders will list here'));

/* CREATE ORDER */
router.post('/', [
  check('email', 'Invalid user supplied')
    .isEmail()
    .normalizeEmail()
    .custom(async (value, { req }) => {
      const userData = await User.findOne({
        email: String(value),
        status: 'active'
      }, config.commonFieldsToExclude);

      if (!userData)
        return false;

      // associate record with req
      req.email = userData;

      return true;
    }),
  check('deliveryAddress', 'Invalid delivery address supplied')
    .isLength({ min: 1 }),
  check('items', 'Items list is missing').exists(),
  check('items.*', 'One or more items are invalid')
    .custom(async (value, { req }) => {
      if (!(value.product && value.quantity > 0 && value.price > 0))
        return false;

      const productData = await Product.findOne({
        title: String(value.product),
        status: 'active'
      }, config.commonFieldsToExclude);

      if (!productData)
        return false;

      return true;
    }),
  sanitize('email').trim().customSanitizer(value => (value)),
  sanitize('deliveryAddress').trim(),
  sanitize('items.*').customSanitizer((value, { req }) => {
    return {
      product: String(value.product),
      quantity: parseInt(value.quantity),
      price: parseFloat(value.price)
    }
  }),
], async (req, res) => {
  try {
    const validRes = validationResult(req).formatWith(errorFormatter);
    if (!validRes.isEmpty())
      throw new Error(validRes.array().join('<br>'))

    const totalAmount = req.body.items.reduce((prevVal, currVal) => prevVal + parseFloat(currVal.price), 0);
    
    let result = await new Order({
      ...req.body,
      totalAmount
    }).save({ new: true });

    if (!result)
      throw new Error('Order not created, please try again');

    if(result.orderState == 'created'){
        console.log('proceed to payment->');

        axios.post(config.paymentEndpoint+'/payment/', {
          "order": result._id,
          "mode": "cash",
          "amount": result.totalAmount
        })
        .then( async (response) => {
          console.log('update order status->', response.data.paymentState);

          const orderData = await Order.findOne({
            _id: mongoose.Types.ObjectId(result._id),
            status: 'active'
          }, config.commonFieldsToExclude);
          
          orderData.orderState = response.data.paymentState;
          orderData.modifiedDate = new Date();

          // update record
          orderData.save({ new: true }, (err, resultUp) => {
            if(err) throw new Error('Order not updated, please try again');
            if(err) res.json({
                      code:`9999`,
                      message: `order not updated, please try again.`
                    });
            return res.json({ 
              code:`0000`,
              message:``,
              result 
            });
          });

        })
        .catch(error => {
           console.log('payment api catch->',error);
           res.json({
            code:`9999`,
            message: `payment not updated, please try again.`
          });

        });

    } else {
        // send result back
      res.json({ 
        code:`0000`,
        message:``,
        result 
      });
    }
    
  } catch (error) {
    console.log('create catch error->', error);
    let message = error.message ? error.message : HTTPCode.badRequest.message;
    let resCode = error.code ? error.code : HTTPCode.badRequest.code;
    return res.status(resCode).json({ 
      code:`404`,
      message 
    });
  }
});

/* GET ALL ORDER DETAILS */
router.get('/all', async (req, res) => {
  try {

    // extract order data from request
    let result = await Order.find({
      status: 'active'
    }, config.commonFieldsToExclude);

    // send result back
    res.json({ 
      code:`0000`,
      message:``,
      result 
    });
  } catch (error) {
    console.log('get order catch error->', error);
    let message = error.message ? error.message : HTTPCode.badRequest.message;
    let resCode = error.code ? error.code : HTTPCode.badRequest.code;
    return res.status(resCode).json({
      code:`404`,
      message
    });
  }
});

/* UPDATE ORDER STATE */
router.put('/:id', [
  check('id', 'Invalid order id supplied')
    .custom(async (value, { req }) => {
      const orderData = await Order.findOne({
        _id: mongoose.Types.ObjectId(req.params.id),
        status: 'active',
        // orderState: 'created'
      }, config.commonFieldsToExclude)

      if (!orderData)
        return false;

      // associate record with req
      req.order = orderData;
      return true;
    }),
  check('orderState', 'Invalid order state supplied')
    .isIn(['confirmed', 'delivered', 'cancelled']),
  sanitize('id').trim().customSanitizer(value => mongoose.Types.ObjectId(value)),
  sanitize('orderState').trim(),
], async (req, res) => {
  try {
    const validRes = validationResult(req).formatWith(errorFormatter);
    if (!validRes.isEmpty())
      throw new Error(validRes.array().join('\n'))

    // extract order data from request
    const orderData = req.order;
    // remove order from request
    delete req.order;
    // update existing record properties
    orderData.orderState = req.body.orderState;
    orderData.modifiedDate = new Date();
    // update record
    let result = await orderData.save({ new: true });

    if (!result)
      throw new Error('Order not updated, please try again.');
    
    if (result.orderState === 'confirmed') {
      setTimeout(async () => {
        // update existing record properties
        result.orderState = 'delivered';
        result.modifiedDate = new Date();
        // update record
        await result.save({ new: true });
      }, 5000);
    } else {

    }
    // send result back
    res.json({ 
      code:`0000`,
      message:``,
      result 
    });
  } catch (error) {
    console.log('update order catch error->', error);
    let message = error.message ? error.message : HTTPCode.badRequest.message;
    let resCode = error.code ? error.code : HTTPCode.badRequest.code;
    return res.status(resCode).json({ 
      code:`404`,
      message 
    });
  }
});

/* GET ORDER DETAILS */
router.get('/:id', [
  check('id', 'Invalid order id supplied')
  .custom(async (value, { req }) => {
    const orderData = await Order.findOne({
      _id: mongoose.Types.ObjectId(req.params.id),
      status: 'active'
    }, config.commonFieldsToExclude)

    if (!orderData)
      return false;

    // associate record with req
    req.order = orderData;
    return true;
  }),
  sanitize('id').trim().customSanitizer(value => mongoose.Types.ObjectId(value)),
], async (req, res) => {
  try {
    const validRes = validationResult(req).formatWith(errorFormatter);
    if (!validRes.isEmpty())
      throw new Error(validRes.array().join('\n'))

    // extract order data from request
    let result = req.order;
    // remove order from request
    delete req.order;

    // send result back
    res.json({ 
      code:`0000`,
      message:``,
      result 
    });
  } catch (error) {
    console.log('get order catch error->', error);
    let message = error.message ? error.message : HTTPCode.badRequest.message;
    let resCode = error.code ? error.code : HTTPCode.badRequest.code;
    return res.status(resCode).json({
      code:`404`,
      message
    });
  }
});



module.exports = router;