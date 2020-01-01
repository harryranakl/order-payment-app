'use strict';
// dependencies setup
const mongoose = require('mongoose');

// Order Schema
const OrderSchema = mongoose.Schema({
  // user: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'User',
  //   default: null
  // },
  email: {
    type: String,
    default: null
  },
  deliveryAddress: {
    type: String,
    default: null
  },
  items: {
    type: Array,
    default: []
  },
  orderState: {
    type: String,
    enum: ['created', 'confirmed', 'delivered', 'cancelled'],
    default: 'created'
  },
  totalAmount: {
    type: Number,
    default: 0
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
module.exports = mongoose.model('Order', OrderSchema);