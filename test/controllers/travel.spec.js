const assert = require('assert')
const travelController = require('../../app/controllers/travel')

describe('Unit test: Travel', () => {
    describe('validateTravel()', () => {
        it('travelNull ', () => {
            let resultExpected = { code: 400, message: 'It is mandatory to inform the pilot travel'}
            let result
            try {
                result = travelController.validateTravel()
            } catch (error) {
                result = error
            }
            assert.deepEqual(result, resultExpected)
        })
        it('pilotNull ', () => {
            let travel = {}
            let resultExpected = { code: 400, message: 'It is mandatory to inform the pilot travel'}
            let result
            try {
                result = travelController.validateTravel(travel)
            } catch (error) {
                result = error
            }
            assert.deepEqual(result, resultExpected)
        })
        it('originPlanetNull ', () => {
            let travel = {
                pilot: '123456789'
            }
            let resultExpected = { code: 400, message: 'It is mandatory to inform the planet of origin travel'}
            let result
            try {
                result = travelController.validateTravel(travel)
            } catch (error) {
                result = error
            }
            assert.deepEqual(result, resultExpected)
        })
        it('destinationPlanetNull ', () => {
            let travel = {
                pilot: '123456789',
                originPlanet: 'Planet1'
            }
            let resultExpected = { code: 400, message: 'It is mandatory to inform the planet of destination travel'}
            let result
            try {
                result = travelController.validateTravel(travel)
            } catch (error) {
                result = error
            }
            assert.deepEqual(result, resultExpected)
        })
        it('shipNull ', () => {
            let travel = {
                pilot: '123456789',
                originPlanet: 'Planet1',
                destinationPlanet: 'Planet2'
            }
            let resultExpected = { code: 400, message: 'It is mandatory to inform the ship travel'}
            let result
            try {
                result = travelController.validateTravel(travel)
            } catch (error) {
                result = error
            }
            assert.deepEqual(result, resultExpected)
        })
        it('contractNull ', () => {
            let travel = {
                pilot: '123456789',
                originPlanet: 'Planet1',
                destinationPlanet: 'Planet2',
                ship: 'Test Ship'
            }
            let resultExpected = { code: 400, message: 'It is mandatory to inform the travel contract'}
            let result
            try {
                result = travelController.validateTravel(travel)
            } catch (error) {
                result = error
            }
            assert.deepEqual(result, resultExpected)
        })
        it('travelOk ', () => {
            let travel = {
                pilot: '123456789',
                originPlanet: 'Planet1',
                destinationPlanet: 'Planet2',
                ship: 'Test Ship',
                contract: '123456789abc'
            }
            let resultExpected
            let result
            try {
                result = travelController.validateTravel(travel)
            } catch (error) {
                result = error
            }
            assert.deepEqual(result, resultExpected)
        })
    })
})