const express = require('express');
const router = express.Router();

const api = require('./app/index.js');

// the routes are overly structured: this was intended to be the base APIs route
// router.use('/api', api);

router.use('/', api);

module.exports = router;