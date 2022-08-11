const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema({
    originPlanet: { type: mongoose.Schema.Types.ObjectId, required: true },
    destinationPlanet: { type: mongoose.Schema.Types.ObjectId, required: true },
    fuelUnits: { type: Number, required: true }
})

schema.index({ 'originPlanet': 1, 'destinationPlanet': 1 },{ unique: true, name: 'travelRouteUnique' })

module.exports = mongoose.model('TravelRoutes', schema)