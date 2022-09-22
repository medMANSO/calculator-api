const chai = require('chai')
const expect = chai.expect

const calculatorService = require('../services/getCalculatorResultService')

describe('Calculator Service', () => {
    it('returns a success object', () => {
        const query = '(2*3)/2'
        const calculationResult = calculatorService(query)

        expect(calculationResult).to.be.a('object')
        expect(calculationResult).to.have.keys('status', 'result')
        expect(calculationResult.status).to.equal('success')
        expect(calculationResult.result).to.equal(3)
    })

    it('returns an error object : calculation error : Division By Zero', () => {
        const query = '(2*3)/(3-3)'
        const calculationResult = calculatorService(query)

        expect(calculationResult).to.be.a('object')
        expect(calculationResult).to.have.keys('status', 'message')
        expect(calculationResult.status).to.equal('error')
        
    })
})