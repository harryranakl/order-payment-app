'use strict';
// dependencies setup
const express = require('express');
const router = express.Router();

/* GET HOME */
router.get('/', [], (req, res) => res.send('You are on right track. Please use the respective APIs'));

module.exports = router;