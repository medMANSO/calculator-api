const express = require('express');
const router = express.Router();

const calculator = require('./calculator')

// the routes are overly structured: this was intended to be the route for the calculation section "/calculator"
// router.use('/calculator', calculator)

router.use('/', calculator)

module.exports = router;


