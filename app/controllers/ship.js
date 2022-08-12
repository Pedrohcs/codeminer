const shipRepository = require('../repositories/ship')
const pilotRepository = require('../repositories/pilot')
const travelRoutesRepository = require('../repositories/travelRoutes')
const transactionRepository = require('../repositories/transaction')
const refillFuelRepository = require('../repositories/refillFuel')
const resourceRepository = require('../repositories/resource')

const FUEL_UNIT_COST = 7

module.exports.createShip = async function(newShip) {
    try {
        validateShip(newShip)
        let pilot = await pilotRepository.getByCertification(newShip.pilot)
        if (!pilot)
            throw { code: 404, message: `Certification ${newShip.pilot} does not correspond to any pilot registered in the system`}

        newShip.pilot = pilot._id
        await shipRepository.create(newShip)
    } catch(error) {
        console.error(`[createShip] Error creating Ship ${newShip.identifierCode}. ${error.message}`)
        throw error
    }
}

function validateShip(newShip) {
    if (!newShip || !newShip.identifierCode)
        throw { code: 400, message: 'It is mandatory to inform the ship\'s identification code'}
    if (!newShip.pilot)
        throw { code: 400, message: 'It is mandatory to inform the ship\'s owner'}
    if (!newShip.fuelCapacity)
        throw { code: 400, message: 'It is mandatory to inform the ship\'s fuel capacity'}
    if (!newShip.fuelLevel)
        throw { code: 400, message: 'It is mandatory to inform the ship\'s current fuel level'}
    if (newShip.fuelLevel > newShip.fuelCapacity)
        throw { code: 400, message: 'Current fuel is higher than the ship\'s fuel limit'}
    if (!newShip.weightCapacity)
        throw { code: 400, message: 'It is mandatory to inform the cargo capacity of the ship'}
}
module.exports.validateShip = validateShip

module.exports.checkFuel = function(ship, travelRoute) {
    return ship.fuelLevel > travelRoute.fuelUnits
}

module.exports.registerFuelConsumption = async function(shipId, travelRouteId) {
    try {
        let ship = await shipRepository.getById(shipId)
        let travelRoute = await travelRoutesRepository.getById(travelRouteId)

        let currentFuel = ship.fuelLevel - travelRoute.fuelUnits

        await shipRepository.updateById(ship._id, { 'fuelLevel': currentFuel })
    } catch(error) {
        console.error(`[registerFuelConsumption] Error recording fuel consumption for the ship ${shipId}. ${error.message}`)
        throw error
    }
}

module.exports.refillFuel = async function(pilotCertification, shipIdentifierCode, units) {
    try {
        let pilot = await pilotRepository.getByCertification(pilotCertification)
        if (!pilot)
            throw { code: 404, message: `Certification ${pilotCertification} does not correspond to any pilot registered in the system`}

        let ship = await shipRepository.getByIdentifierCode(shipIdentifierCode)
        if (!ship)
            throw { code: 404, message: `Ship ${shipIdentifierCode} was not found in the system`}

        let debitCredits = getDebitCredits(ship, units, pilot.credits)

        await shipRepository.updateById(ship._id, { 'fuelLevel': fuel })

        await pilotRepository.updateById(pilot._id, { 'credits': debitCredits })

        let refillFuel = await refillFuelRepository.create({
            'value': credits,
            'quantity': units,
            'ship': ship._id,
            'pilot': pilot._id
        })

        await transactionRepository.create({
            'description': `${pilot.name} bought fuel`,
            'value': credits,
            'type': 'c',
            'refillFuel': refillFuel._id
        })
    } catch(error) {
        console.error(`[refillFuel] Error fueling ship ${shipIdentifierCode} for pilot ${pilotCertification}. ${error.message}`)
        throw error
    }
}

function getDebitCredits(ship, units, pilotCredits) {
    let credits = units * FUEL_UNIT_COST
    let fuel = ship.fuelLevel + units

    if (fuel > ship.fuelCapacity)
        throw { code: 406, message: 'Requested quantity exceeds the ship\'s fuel limit!' }

    if (credits > pilotCredits)
        throw { code: 406, message: 'You do not have the requested amount of credits for refilling fuel' }

    return pilotCredits - credits
}
module.exports.getDebitCredits = getDebitCredits

module.exports.checkSupportedWeight = async function(ship, resourcesId) {
    try {
        let totalWeight = 0
        let resources = await resourceRepository.getAllInContract(resourcesId)

        resources.forEach(resource => {
            totalWeight += parseFloat(resource.weight)
        })

        return totalWeight > ship.weightCapacity
    } catch(error) {
        console.error(`[checkSupportedWeight] Error calculating weight supported by ship ${ship.identifierCode}. ${error.message}`)
        throw error
    }
}