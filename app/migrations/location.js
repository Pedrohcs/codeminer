const locationRepository = require('../repositories/location')

const INITIAL_LOCATION_NAMES = ["Andvari", "Demeter", "Aqua", "Calas"]

module.exports.createInitialLocations = async function() {
    try {
        for (let locationName of INITIAL_LOCATION_NAMES) {
            await createLocation(locationName)
        }
    } catch (error) {
        console.error(`[createInitialLocations] Error creating initial locations. ${error.message}`)
        throw error
    }
}

async function createLocation(name) {
    let location = await locationRepository.getByName(name)
    if (location) return

    location = {
        name: name
    }
    await locationRepository.create(location)
}