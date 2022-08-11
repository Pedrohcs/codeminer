const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema({
    identifierCode: { type: String, required: true},
    pilot: { type: mongoose.Schema.Types.ObjectId, required: true },
    fuelCapacity: { type: Number, required: true },
    fuelLevel: { type: Number, required: true },
    weightCapacity: { type: Schema.Types.Decimal128, required: true },
})

schema.index({ 'identifierCode': 1 },{ unique: true, name: 'identifierCodeUnique' })

module.exports = mongoose.model('Ships', schema)