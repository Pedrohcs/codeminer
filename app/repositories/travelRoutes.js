const TravelRoutes = require('../models/travelRoutes')

module.exports.create = async function(ship) {
    try {
        return await TravelRoutes.create(ship)
    } catch (error) {
        throw error
    }
}

module.exports.getById = async function(id) {
    try {
        return await TravelRoutes.findOne({ '_id': id })
    } catch (error) {
        throw error
    }
}

module.exports.getByRoute = async function(originPlanet, destinationPlanet) {
    try {
        return await TravelRoutes.findOne({ 'originPlanet': originPlanet, 'destinationPlanet': destinationPlanet })
    } catch (error) {
        throw error
    }
}

module.exports.getByOriginPlanet = async function(originPlanet) {
    try {
        return await TravelRoutes.findOne({ 'originPlanet': originPlanet })
    } catch (error) {
        throw error
    }
}