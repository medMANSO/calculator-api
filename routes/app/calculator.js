const express = require('express');
const router = express.Router();
const validator = require('../../middleware/validators/getCalculatorResult')
const calculationController = require('../../controllers/getCalculatorResultController')

router.get('/calculus',validator, calculationController.getCalculatorResult)

module.exports = router;