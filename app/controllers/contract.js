const contractRepository = require('../repositories/contract')
const locationRepository = require('../repositories/location')
const resourceRepository = require('../repositories/resource')
const pilotRepository = require('../repositories/pilot')
const resourceController = require('./resource')
const mongoose = require("mongoose")

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

module.exports.listOpenContracts = async function() {
    try {
        let contracts = await contractRepository.getOpenContracts()

        return formatContracts(contracts)
    } catch(error) {
        console.error(`[listOpenContracts] Error listing open contracts. ${error.message}`)
        throw error
    }
}

async function formatContracts(contracts) {
    let contractsFormats = []

    for (let contract of contracts) {
        let originPlanet = await locationRepository.getById(contract.originPlanet)
        let destinationPlanet = await locationRepository.getById(contract.destinationPlanet)
        let resources = await resourceRepository.getAllInContract(contract.payload)

        resources = resources.map(resource => {
            return {
                'name': resource.name,
                'weight': `${resource.weight.toString()} tons`
            }
        })

        contractsFormats.push({
            'id': contract._id,
            'description': contract.description || '',
            'originPlanet': originPlanet.name,
            'destinationPlanet': destinationPlanet.name,
            'resource': resources,
            'value': contract.value
        })
    }

    return contractsFormats
}

module.exports.acceptContract = async function(contractId, pilotCertification) {
    try {
        let contract = await contractRepository.getById(mongoose.Types.ObjectId(contractId))
        if (!contract)
            throw { code: 404, message: `Contrat ${contractId} not found in the system` }

        let pilot = await pilotRepository.getByCertification(pilotCertification)
        if (!pilot)
            throw { code: 404, message: `Pilot with certification ${pilotCertification} not found in the system` }

        await contractRepository.updateById(contract._id, { 'pilot': pilot._id })
    } catch(error) {
        console.error(`[acceptContract] Error accepting the contract ${contractId}. ${error.message}`)
        throw error
    }
}