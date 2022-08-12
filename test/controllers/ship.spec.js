const assert = require('assert')
const shipController = require('../../app/controllers/ship')

describe('Unit test: Ship', () => {
    describe('validateShip()', () => {
        it('shipNull', () => {
            let resultExpected = { code: 400, message: 'It is mandatory to inform the ship\'s identification code'}
            let result
            try {
                result = shipController.validateShip()
            } catch (error) {
                result = error
            }
            assert.deepEqual(result, resultExpected)
        })
        it('identifierCodeNull', () => {
            let ship = {}
            let resultExpected = { code: 400, message: 'It is mandatory to inform the ship\'s identification code'}
            let result
            try {
                result = shipController.validateShip(ship)
            } catch (error) {
                result = error
            }
            assert.deepEqual(result, resultExpected)
        })
        it('pilotNull', () => {
            let ship = {
                identifierCode: 'Test Ship'
            }
            let resultExpected = { code: 400, message: 'It is mandatory to inform the ship\'s owner'}
            let result
            try {
                result = shipController.validateShip(ship)
            } catch (error) {
                result = error
            }
            assert.deepEqual(result, resultExpected)
        })
        it('fuelCapacityNull', () => {
            let ship = {
                identifierCode: 'Test Ship',
                pilot: '123456789'
            }
            let resultExpected = { code: 400, message: 'It is mandatory to inform the ship\'s fuel capacity'}
            let result
            try {
                result = shipController.validateShip(ship)
            } catch (error) {
                result = error
            }
            assert.deepEqual(result, resultExpected)
        })
        it('fuelLevelNull', () => {
            let ship = {
                identifierCode: 'Test Ship',
                pilot: '123456789',
                fuelCapacity: 500
            }
            let resultExpected = { code: 400, message: 'It is mandatory to inform the ship\'s current fuel level'}
            let result
            try {
                result = shipController.validateShip(ship)
            } catch (error) {
                result = error
            }
            assert.deepEqual(result, resultExpected)
        })
        it('fuelLevelLargerfuelCapacity', () => {
            let ship = {
                identifierCode: 'Test Ship',
                pilot: '123456789',
                fuelCapacity: 500,
                fuelLevel: 700
            }
            let resultExpected = { code: 400, message: 'Current fuel is higher than the ship\'s fuel limit'}
            let result
            try {
                result = shipController.validateShip(ship)
            } catch (error) {
                result = error
            }
            assert.deepEqual(result, resultExpected)
        })
        it('weightCapacityNull', () => {
            let ship = {
                identifierCode: 'Test Ship',
                pilot: '123456789',
                fuelCapacity: 500,
                fuelLevel: 500
            }
            let resultExpected = { code: 400, message: 'It is mandatory to inform the cargo capacity of the ship'}
            let result
            try {
                result = shipController.validateShip(ship)
            } catch (error) {
                result = error
            }
            assert.deepEqual(result, resultExpected)
        })
        it('shipOk', () => {
            let ship = {
                identifierCode: 'Test Ship',
                pilot: '123456789',
                fuelCapacity: 500,
                fuelLevel: 500,
                weightCapacity: 5000
            }
            let resultExpected
            let result
            try {
                result = shipController.validateShip(ship)
            } catch (error) {
                result = error
            }
            assert.deepEqual(result, resultExpected)
        })
    })
    describe('getDebitCredits()', () => {
        it('fuelLargerfuelCapacity', () => {
            let ship = {
                fuelLevel: 500,
                fuelCapacity: 500
            }
            let units = 300
            let pilotCredits = 2100
            let resultExpected = { code: 406, message: 'Requested quantity exceeds the ship\'s fuel limit!' }
            let result
            try {
                result = shipController.getDebitCredits(ship, units, pilotCredits)
            } catch (error) {
                result = error
            }
            assert.deepEqual(result, resultExpected)
        })
        it('creditsLargerPilotCredits', () => {
            let ship = {
                fuelLevel: 0,
                fuelCapacity: 500
            }
            let units = 300
            let pilotCredits = 2000
            let resultExpected = { code: 406, message: 'You do not have the requested amount of credits for refilling fuel' }
            let result
            try {
                result = shipController.getDebitCredits(ship, units, pilotCredits)
            } catch (error) {
                result = error
            }
            assert.deepEqual(result, resultExpected)
        })
        it('getDebitCreditsOk', () => {
            let ship = {
                fuelLevel: 0,
                fuelCapacity: 500
            }
            let units = 300
            let pilotCredits = 3000
            let resultExpected = 900
            let result
            try {
                result = shipController.getDebitCredits(ship, units, pilotCredits)
            } catch (error) {
                result = error
            }
            assert.deepEqual(result, resultExpected)
        })
    })
    describe('checkFuel()', () => {
        it('enoughFuel', () => {
            let resultExpected = true
            let ship = {
                fuelLevel: 500
            }
            let travelRoute = {
                fuelUnits: 300
            }

            let result = shipController.checkFuel(ship, travelRoute)
            assert.deepEqual(result, resultExpected)
        })
        it('insufficientFuel', () => {
            let resultExpected = false
            let ship = {
                fuelLevel: 500
            }
            let travelRoute = {
                fuelUnits: 700
            }

            let result = shipController.checkFuel(ship, travelRoute)
            assert.deepEqual(result, resultExpected)
        })
    })
})