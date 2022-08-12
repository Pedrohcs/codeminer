const assert = require('assert')
const pilotController = require('../../app/controllers/pilot')

describe('Unit test: Pilot', () => {
    describe('validatePilot()', () => {
        it('pilotNull', () => {
            let resultExpected = { code: 400, message: 'It is mandatory to inform the pilot\'s document of permission to pilot a ship'}
            let result
            try {
                result = pilotController.validatePilot()
            } catch (error) {
                result = error
            }
            assert.deepEqual(result, resultExpected)
        })
        it('certificationNull', () => {
            let pilot = {}
            let resultExpected = { code: 400, message: 'It is mandatory to inform the pilot\'s document of permission to pilot a ship'}
            let result
            try {
                result = pilotController.validatePilot(pilot)
            } catch (error) {
                result = error
            }
            assert.deepEqual(result, resultExpected)
        })
        it('nameNull', () => {
            let pilot = {
                certification: '379354508162306'
            }
            let resultExpected = { code: 400, message: 'It is mandatory to inform the pilot\'s name'}
            let result
            try {
                result = pilotController.validatePilot(pilot)
            } catch (error) {
                result = error
            }
            assert.deepEqual(result, resultExpected)
        })
        it('ageNull', () => {
            let pilot = {
                certification: '379354508162306',
                name: 'Test'
            }
            let resultExpected = { code: 400, message: 'It is mandatory to inform the pilot\'s agr (number)'}
            let result
            try {
                result = pilotController.validatePilot(pilot)
            } catch (error) {
                result = error
            }
            assert.deepEqual(result, resultExpected)
        })
        it('ageInappropriate', () => {
            let pilot = {
                certification: '379354508162306',
                name: 'Test',
                age: 17
            }
            let resultExpected = { code: 406, message: 'Riders must be over 18 years old' }
            let result
            try {
                result = pilotController.validatePilot(pilot)
            } catch (error) {
                result = error
            }
            assert.deepEqual(result, resultExpected)
        })
        it('locationNull', () => {
            let pilot = {
                certification: '379354508162306',
                name: 'Test',
                age: 18
            }
            let resultExpected = { code: 400, message: 'It is mandatory to inform the current location of the pilot'}
            let result
            try {
                result = pilotController.validatePilot(pilot)
            } catch (error) {
                result = error
            }
            assert.deepEqual(result, resultExpected)
        })
        it('pilotOk', () => {
            let pilot = {
                certification: '379354508162306',
                name: 'Test',
                age: 18,
                location: 'Planet'
            }
            let resultExpected
            let result
            try {
                result = pilotController.validatePilot(pilot)
            } catch (error) {
                result = error
            }
            assert.deepEqual(result, resultExpected)
        })
    })
})