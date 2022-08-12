const pilotRepository = require('../repositories/pilot')
const locationRepository = require('../repositories/location')
const contractRepository = require('../repositories/contract')
const transactionRepository = require('../repositories/transaction')
const utils = require('./utils/utils')

const INITIAL_CREDITS = 0

module.exports.createPilot = async function(newPilot) {
    try {
        validatePilot(newPilot)
        let location = await locationRepository.getByName(newPilot.location)
        if (!location)
            throw { code: 404, message: 'Location not found in the system'}

        newPilot.location = location._id
        newPilot.credits = INITIAL_CREDITS

        await pilotRepository.create(newPilot)
    } catch(error) {
        console.error(`[createPilot] Error creating Pilot ${newPilot.name} - ${newPilot.certification}. ${error.message}`)
        throw error
    }
}

function validatePilot(newPilot) {
    if (!newPilot || !newPilot.certification)
        throw { code: 400, message: 'It is mandatory to inform the pilot\'s document of permission to pilot a ship'}
    if (!utils.validateCertification(newPilot.certification))
        throw { code: 400, message: 'Document of permission to pilot a ship informed is not valid'}
    if (!newPilot.name)
        throw { code: 400, message: 'It is mandatory to inform the pilot\'s name'}
    if (!newPilot.age || isNaN(parseInt(newPilot.age)))
        throw { code: 400, message: 'It is mandatory to inform the pilot\'s agr (number)'}
    if (newPilot.age < 18)
        throw { code: 406, message: 'Riders must be over 18 years old' }
    if (!newPilot.location)
        throw { code: 400, message: 'It is mandatory to inform the current location of the pilot'}
}
module.exports.validatePilot = validatePilot

module.exports.creditContract = async function(pilotId, contractId) {
    try {
        let pilot = await pilotRepository.getById(pilotId)
        let contract = await contractRepository.getById(contractId)

        let currentCredits = pilot.credits + contract.value

        await pilotRepository.updateById(pilot._id, { 'credits': currentCredits })
        await transactionRepository.create({
            'description': contract.description || '',
            'value': contract.value,
            'type': 'd',
            'contract': contract._id
        })
    } catch(error) {
        console.error(`[creditContract] Error giving credits to pilot ${pilotId}. ${error.message}`)
        throw error
    }
}