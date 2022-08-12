const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema({
    description: String,
    payload: [{ type: mongoose.Schema.Types.ObjectId }],
    originPlanet: { type: mongoose.Schema.Types.ObjectId, required: true },
    destinationPlanet: { type: mongoose.Schema.Types.ObjectId, required: true },
    value: { type: Number, required: true },
    pilot: { type: mongoose.Schema.Types.ObjectId },
    finished: { type: Boolean, default: false }
})

module.exports = mongoose.model('Contracts', schema)