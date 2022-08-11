const shipRepository = require('../repositories/ship')
const pilotRepository = require('../repositories/pilot')
const travelRoutesRepository = require("../repositories/travelRoutes");

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
    if (!newShip.weightCapacity)
        throw { code: 400, message: 'It is mandatory to inform the cargo capacity of the ship'}
}

module.exports.checkFuel = function(ship, travelRoute) {
    return ship.fuelLevel >= travelRoute.fuelUnits
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