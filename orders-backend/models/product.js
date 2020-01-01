'use strict';
// dependencies setup
const mongoose = require('mongoose');

// Product Schema
const ProductSchema = mongoose.Schema({
  title: {
    type: String,
    default: null
  },
  description: {
    type: String,
    default: null
  },
  price: {
    type: String,
    default: null
  },
  available: {
    type: Boolean,
    default: false
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
module.exports = mongoose.model('Product', ProductSchema);