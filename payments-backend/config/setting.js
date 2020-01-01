'use strict';
// define global settings used in throughout the API
module.exports = {
  port: process.env.PORT || 3000,
  database: process.env.MONGO_URL || `your mongo url`,
  siteURL: process.env.SITE_URL,
  commonFieldsToExclude: {
    '__v': 0,
    'password': 0,
    'resetExpires': 0,
    'resetToken': 0,
    'securePin': 0
  }
}