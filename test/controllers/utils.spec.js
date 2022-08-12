const assert = require('assert')
const utilsSpec = require('../../app/controllers/utils/utils')

describe('Unit test: Utils', () => {
    describe('validateCertification()', () => {
        it('validCertification', () => {
            let certification = '379354508162306'
            let resultExpected = true

            let result = utilsSpec.validateCertification(certification)
            assert.deepEqual(result, resultExpected)
        })
        it('invalidCertification', () => {
            let certification = '1111111111'
            let resultExpected = false

            let result = utilsSpec.validateCertification(certification)
            assert.deepEqual(result, resultExpected)
        })
    })
    describe('sum()', () => {
        it('numberLessNine', () => {
            let number = 8
            let resultExpected = 8

            let result = utilsSpec.sum(number)
            assert.deepEqual(result, resultExpected)
        })
        it('numberGreaterNine', () => {
            let number = 15
            let resultExpected = 6

            let result = utilsSpec.sum(number)
            assert.deepEqual(result, resultExpected)
        })
    })
})