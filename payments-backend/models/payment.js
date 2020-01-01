'use strict';
// dependencies setup
const mongoose = require('mongoose');

// Payment Schema
const PaymentSchema = mongoose.Schema({
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
    default: null
  },
  mode: {
    type: String,
    enum: ['cash', 'cheque'],
    default: 'cash'
  },
  amount: {
    type: Number,
    default: 0
  },
  paymentState: {
    type: String,
    enum: ['confirmed', 'declined', 'cancelled'],
    default: null
  },
  createDate: {
    type: Date,
    default: Date.now
  },
  modifiedDate: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active'
  }
});

// initialize model object
module.exports = mongoose.model('Payment', PaymentSchema);