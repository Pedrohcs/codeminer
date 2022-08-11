const travelRepository = require('../repositories/travelRoutes')
const locationRepository = require('../repositories/location')

const INITIAL_TRAVELS = [
    {
        "originPlanet": "Andvari",
        "destinationPlanet": "Aqua",
        "fuelUnits": 13
    },{
        "originPlanet": "Andvari",
        "destinationPlanet": "Calas",
        "fuelUnits": 23
    },{
        "originPlanet": "Demeter",
        "destinationPlanet": "Aqua",
        "fuelUnits": 22
    },{
        "originPlanet": "Demeter",
        "destinationPlanet": "Calas",
        "fuelUnits": 25
    },{
        "originPlanet": "Aqua",
        "destinationPlanet": "Demeter",
        "fuelUnits": 30
    },{
        "originPlanet": "Aqua",
        "destinationPlanet": "Calas",
        "fuelUnits": 12
    },{
        "originPlanet": "Calas",
        "destinationPlanet": "Andvari",
        "fuelUnits": 20
    },{
        "originPlanet": "Calas",
        "destinationPlanet": "Demeter",
        "fuelUnits": 25
    },{
        "originPlanet": "Calas",
        "destinationPlanet": "Aqua",
        "fuelUnits": 15
    }
]

module.exports.createInitialTravels = async function() {
    try {
        for (let travel of INITIAL_TRAVELS) {
            await createTravel(travel)
        }
    } catch (error) {
        console.error(`[createInitialTravels] Error creating initial travel. ${error.message}`)
        throw error
    }
}

async function createTravel(newTravel) {
    let originPlanet = await locationRepository.getByName(newTravel.originPlanet)
    if (!originPlanet)
        throw { code: 404, message: 'Origin Planet not found in the system'}

    let destinationPlanet = await locationRepository.getByName(newTravel.destinationPlanet)
    if (!destinationPlanet)
        throw { code: 404, message: 'Destination Planet not found in the system'}

    let travel = await travelRepository.getByRoute(originPlanet._id, destinationPlanet._id)
    if (travel) return

    newTravel.originPlanet = originPlanet._id
    newTravel.destinationPlanet = destinationPlanet._id

    await travelRepository.create(newTravel)
}