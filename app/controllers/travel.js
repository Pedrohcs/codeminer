const mongoose = require('mongoose')
const shipController = require('../controllers/ship')
const pilotController = require('../controllers/pilot')
const travelRepository = require('../repositories/travel')
const pilotRepository = require('../repositories/pilot')
const shipRepository = require('../repositories/ship')
const locationRepository = require('../repositories/location')
const travelRoutesRepository = require('../repositories/travelRoutes')
const contractRepository = require('../repositories/contract')

module.exports.registerTravel = async function(newTravel) {
    try {
        validateTravel(newTravel)
        let  { travel, pilot, destinationPlanet, contract, travelEndsContract } = await formatTravel(newTravel)

        await travelRepository.create(travel)

        await pilotRepository.updateById(pilot._id, { 'location': destinationPlanet._id })
        await shipController.registerFuelConsumption(travel.ship, travel.route)
        if (travelEndsContract) {
            await contractRepository.updateById(contract._id, { 'finished': true })
            await pilotController.creditContract(pilot._id, contract._id)
        }
    } catch(error) {
        console.error(`[registerTravel] Error recording pilot: ${newTravel.pilot}, ship: ${newTravel.ship}, contract: ${newTravel.contract} Travel . ${error.message}`)
        throw error
    }
}

function validateTravel(newTravel) {
    if (!newTravel || !newTravel.pilot)
        throw { code: 400, message: 'It is mandatory to inform the pilot travel'}
    if (!newTravel.originPlanet)
        throw { code: 400, message: 'It is mandatory to inform the planet of origin travel'}
    if (!newTravel.destinationPlanet)
        throw { code: 400, message: 'It is mandatory to inform the planet of destination travel'}
    if (!newTravel.ship)
        throw { code: 400, message: 'It is mandatory to inform the ship travel'}
    if (!newTravel.contract)
        throw { code: 400, message: 'It is mandatory to inform the travel contract'}
}
module.exports.validateTravel = validateTravel

async function formatTravel(newTravel) {
    let pilot = await pilotRepository.getByCertification(newTravel.pilot)
    if (!pilot)
        throw { code: 404, message: `Certification ${newTravel.pilot} does not correspond to any pilot registered in the system`}

    let ship = await shipRepository.getByIdentifierCode(newTravel.ship)
    if (!ship)
        throw { code: 404, message: `Ship ${newTravel.ship} was not found in the system`}

    let originPlanet = await locationRepository.getByName(newTravel.originPlanet)
    if (!originPlanet)
        throw { code: 404, message: 'Origin Planet not found in the system'}

    let destinationPlanet = await locationRepository.getByName(newTravel.destinationPlanet)
    if (!destinationPlanet)
        throw { code: 404, message: 'Destination Planet not found in the system'}

    let travelRoute = await travelRoutesRepository.getByRoute(originPlanet._id, destinationPlanet._id)
    if (!travelRoute)
        throw { code: 404, message: 'The route selected for the trip is currently not available. Please choose another destination planet in relation to your current planet'}

    if (!shipController.checkFuel(ship, travelRoute))
        throw { code: 406, message: `Your ship doesn\'t have enough fuel for this journey. It only has ${ship.fuelLevel} of fuel. Refuel or change route`}

    let contract = await contractRepository.getById(mongoose.Types.ObjectId(newTravel.contract))
    if (!contract)
        throw { code: 404, message: 'Contract X not found'}

    return {
        travel: {
            "route": travelRoute._id,
            "pilot": pilot._id,
            "ship": ship._id,
            "contract": contract._id
        },
        pilot: pilot,
        destinationPlanet: destinationPlanet,
        contract: contract,
        travelEndsContract: contract.destinationPlanet.toString() === destinationPlanet._id.toString()
    }
}