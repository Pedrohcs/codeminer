const assert = require('assert')
const contractController = require('../../app/controllers/contract')

describe('Unit test: Contract', () => {
    describe('validateContract()', () => {
        it('contractNull', () => {
            let resultExpected = { code: 400, message: 'It is mandatory to inform the planet of origin of the contract'}
            let result
            try {
                result = contractController.validateContract()
            } catch (error) {
                result = error
            }
            assert.deepEqual(result, resultExpected)
        })
        it('originPlanetNull', () => {
            let contract = {}
            let resultExpected = { code: 400, message: 'It is mandatory to inform the planet of origin of the contract'}
            let result
            try {
                result = contractController.validateContract(contract)
            } catch (error) {
                result = error
            }
            assert.deepEqual(result, resultExpected)
        })
        it('destinationPlanetNull', () => {
            let contract = {
                originPlanet: "Planet1"
            }
            let resultExpected = { code: 400, message: 'It is mandatory to inform the planet of destination of the contract'}
            let result
            try {
                result = contractController.validateContract(contract)
            } catch (error) {
                result = error
            }
            assert.deepEqual(result, resultExpected)
        })
        it('payloadNull', () => {
            let contract = {
                originPlanet: 'Planet1',
                destinationPlanet: 'Planet2'
            }
            let resultExpected = { code: 400, message: 'It is mandatory to inform at least one load for the contract'}
            let result
            try {
                result = contractController.validateContract(contract)
            } catch (error) {
                result = error
            }
            assert.deepEqual(result, resultExpected)
        })
        it('payloadEmpty', () => {
            let contract = {
                originPlanet: 'Planet1',
                destinationPlanet: 'Planet2',
                payload: []
            }
            let resultExpected = { code: 400, message: 'It is mandatory to inform at least one load for the contract'}
            let result
            try {
                result = contractController.validateContract(contract)
            } catch (error) {
                result = error
            }
            assert.deepEqual(result, resultExpected)
        })
        it('valueNull', () => {
            let contract = {
                originPlanet: 'Planet1',
                destinationPlanet: 'Planet2',
                payload: [{
                    name: 'Resource1',
                    weight: 55
                }]
            }
            let resultExpected = { code: 400, message: 'It is mandatory to inform the contract\'s value'}
            let result
            try {
                result = contractController.validateContract(contract)
            } catch (error) {
                result = error
            }
            assert.deepEqual(result, resultExpected)
        })
        it('contractOk', () => {
            let contract = {
                originPlanet: 'Planet1',
                destinationPlanet: 'Planet2',
                payload: [{
                    name: 'Resource1',
                    weight: 55
                }],
                value: 100
            }
            let resultExpected
            let result
            try {
                result = contractController.validateContract(contract)
            } catch (error) {
                result = error
            }
            assert.deepEqual(result, resultExpected)
        })
    })
})