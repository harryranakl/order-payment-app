'use strict';
// dependencies setup
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// User Schema
const UserSchema = mongoose.Schema({
  fullName: {
    type: String,
    default: null
  },
  phone: {
    type: String,
    default: null
  },
  email: {
    type: String,
    default: null
  },
  password: {
    type: String,
    default: null
  },
  resetToken: {
    type: String,
    default: null
  },
  resetExpires: {
    type: Number,
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
module.exports = mongoose.model('User', UserSchema);