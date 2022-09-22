const chai = require('chai')
const chaiHttp = require('chai-http')
const express = require('express')
const route = require('../routes')

const expect = chai.expect

chai.use(chaiHttp)

const createFakeServer = () => {
    const app = express()
    const apiPort = 30001
    app.use(route)
    app.listen(apiPort)
    return app
}

describe('Calculator API', () => {
    let fakeServer

    before(() => {
        fakeServer = createFakeServer()
    })

    it('should return a success object', async () => {
        const queryString = 'MiAqICgyMy8oMyozKSktIDIzICogKDIqMyk='
        const response = await chai.request(fakeServer)
            .get(`/calculus?query=${queryString}`)
            .set("content-type", "application/json")

        expect(response.body).to.be.a("object");
        expect(response.body).to.have.keys(["error", "result"])
        expect(response.body.error).to.equal(false)
        expect(response.body.result).to.be.a('number')
    })

    it('should return an error object : query input not valid', async () => {
        const queryString = 'MiAqICgyMy8oMyozKSktIDIzICogKDIqMyk'
        const response = await chai.request(fakeServer)
            .get(`/calculus?query=${queryString}`)
            .set("content-type", "application/json")

        expect(response.body).to.be.a("object");
        expect(response.body).to.have.keys(["error", "message"])
        expect(response.body.error).to.equal(true)
        expect(response.body.message).to.be.a('string')
    })

    it('should return an error object : Division By Zero', async () => {
        const queryString = 'KDIzKjEyKS8w'
        const response = await chai.request(fakeServer)
            .get(`/calculus?query=${queryString}`)
            .set("content-type", "application/json")

        expect(response.body).to.be.a("object");
        expect(response.body).to.have.keys(["error", "message"])
        expect(response.body.error).to.equal(true)
        expect(response.body.message).to.be.a('string')
    })
})