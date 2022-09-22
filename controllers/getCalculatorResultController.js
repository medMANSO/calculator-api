const logger = require('../config/logger')
const getCalculatorResult = require('../services/getCalculatorResultService')

exports.getCalculatorResult = (req, res) => {
    try {

        const query = req.query.query
        const decodedQuery = Buffer.from(query, 'base64').toString('utf8')
        const sanitizedQuery = decodedQuery.replace(/[^-()\d/*+.]/g, '');

        if(sanitizedQuery.search(/\/0+(?:\.?0*)?(?!\d)/) !== -1) {
            return res.status(400).json({"error": true, "message": "AHA ! you're trying to divide by zero !"})
        }
        
        const calculationResult = getCalculatorResult(sanitizedQuery)
        
        return calculationResult.status === 'success' 
            ? res.status(200).json({"error": false, "result": calculationResult.result}) 
            : res.status(400).json({"error": true, "message": calculationResult.message})

    } catch (error) {
        logger.error('Something went wrong !', error)
        res.status(400).json({"error": true, "message": 'An error has occured !'})
    }
}