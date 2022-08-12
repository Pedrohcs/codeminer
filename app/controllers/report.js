const contractRepository = require('../repositories/contract')
const locationRepository = require('../repositories/location')
const resourceRepository = require('../repositories/resource')
const transactionRepository = require('../repositories/transaction')
const pilotRepository = require('../repositories/pilot')

module.exports.totalWeight = async function() {
    try {
        let report = {}
        let locations = await locationRepository.getAll()

        for (let location of locations) {
            report[`${location.name}`] = {
                'sent': {
                    'food': 0,
                    'minerals': 0,
                    'water': 0
                },
                'received': {
                    'food': 0,
                    'minerals': 0,
                    'water': 0
                }
            }
        }

        let contracts = await contractRepository.getFinalizedContracts()

        for (let contract of contracts) {
            let originPlanet = await locationRepository.getById(contract.originPlanet)
            let destinationPlanet = await locationRepository.getById(contract.destinationPlanet)
            let resources = await resourceRepository.getAllInContract(contract.payload)

            resources.forEach(resource => {
                report[`${originPlanet.name}`].sent[`${resource.name}`] += parseFloat(resource.weight)
                report[`${destinationPlanet.name}`].received[`${resource.name}`] += parseFloat(resource.weight)
            })
        }

        return report
    } catch(error) {
        console.error(`[totalWeight] Error generating total weight report. ${error.message}`)
        throw error
    }
}

module.exports.percentageResourceByPilot = async function() {
    try {
        let report = {}

        let pilots = await pilotRepository.getAll()

        for (let pilot of pilots) {
            let totalResources = {
                'food': 0,
                'minerals': 0,
                'water': 0
            }
            let valueTotal = 0

            let contracts = await contractRepository.getFinalizedContractsByPilot(pilot._id)
            for (let contract of contracts) {
                let resources = await resourceRepository.getAllInContract(contract.payload)

                resources.forEach(resource => {
                    totalResources[`${resource.name}`] += 1
                    valueTotal += 1
                })
            }

            report[`${pilot.name}`] = {}
            for (let resourceName of Object.keys(totalResources)) {
                report[`${pilot.name}`][`${resourceName}`] = ((totalResources[`${resourceName}`] * 100) / valueTotal).toFixed(2)
            }
        }

        return report
    } catch(error) {
        console.error(`[percentageResourceByPilot] Error percentage of resource type transported by each pilot. report. ${error.message}`)
        throw error
    }
}


module.exports.intergalacticFederationTransactions = async function() {
    try {
        let report = []

        let transactions = await transactionRepository.getAll()

        for (let transaction of transactions) {
            report.push(`${transaction.description}${transaction.type === 'd' ? ' paid: -' : ': +'}${transaction.value}`)
        }

        return report
    } catch(error) {
        console.error(`[transactions] Error generating Intergalactic Federation transactions report. ${error.message}`)
        throw error
    }
}