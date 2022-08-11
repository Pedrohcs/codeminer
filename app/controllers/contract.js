const contractRepository = require('../repositories/contract')
const locationRepository = require('../repositories/location')
const resourceController = require('./resource')

module.exports.createContract = async function(newContract) {
    try {
        validateContract(newContract)

        let originPlanet = await locationRepository.getByName(newContract.originPlanet)
        if (!originPlanet)
            throw { code: 404, message: `Planet of origin (location) ${newContract.originPlanet} not found in the system`}
        newContract.originPlanet = originPlanet._id

        let destinationPlanet = await locationRepository.getByName(newContract.destinationPlanet)
        if (!destinationPlanet)
            throw { code: 404, message: `Planet of destination (location) ${newContract.destinationPlanet} not found in the system`}
        newContract.destinationPlanet = destinationPlanet._id

        let resources = []
        for (let contractResource of newContract.payload) {
            let resource = await resourceController.createResource(contractResource)
            resources.push(resource._id)
        }
        newContract.payload = resources

        await contractRepository.create(newContract)
    } catch(error) {
        console.error(`[createContract] Error creating Contract. ${error.message}`)
        throw error
    }
}

function validateContract(newContract) {
    if (!newContract || !newContract.originPlanet)
        throw { code: 400, message: 'It is mandatory to inform the planet of origin of the contract'}
    if (!newContract.destinationPlanet)
        throw { code: 400, message: 'It is mandatory to inform the planet of destination of the contract'}
    if (!newContract.payload || newContract.payload.length === 0)
        throw { code: 400, message: 'It is mandatory to inform at least one load for the contract'}
    if (!newContract.value)
        throw { code: 400, message: 'It is mandatory to inform the contract\'s value'}
}

module.exports.listOpenContracts = function() {
    try {

    } catch(error) {
        console.error(`[listOpenContracts] Error listing open contracts. ${error.message}`)
        throw error
    }
}