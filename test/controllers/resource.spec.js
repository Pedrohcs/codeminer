const assert = require('assert')
const resourceController = require('../../app/controllers/resource')

describe('Unit test: Resource', () => {
    describe('validateResource()', () => {
        it('nameNull ', () => {
            let resource = {}
            let resultExpected = { code: 400, message: 'It is mandatory to inform the payload\'s name'}
            let result
            try {
                result = resourceController.validateResource(resource)
            } catch (error) {
                result = error
            }
            assert.deepEqual(result, resultExpected)
        })
        it('weightNull ', () => {
            let resource = {
                name: 'food'
            }
            let resultExpected = { code: 400, message: 'It is mandatory to inform the payload\'s weight'}
            let result
            try {
                result = resourceController.validateResource(resource)
            } catch (error) {
                result = error
            }
            assert.deepEqual(result, resultExpected)
        })
        it('resourceOk ', () => {
            let resource = {
                name: 'food',
                weight: 500
            }
            let resultExpected
            let result
            try {
                result = resourceController.validateResource(resource)
            } catch (error) {
                result = error
            }
            assert.deepEqual(result, resultExpected)
        })
    })
})