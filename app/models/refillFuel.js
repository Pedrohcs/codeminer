const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema({
    value: { type: Number, required: true},
    quantity: { type: Number, required: true },
    ship: { type: mongoose.Schema.Types.ObjectId, required: true },
    pilot: { type: mongoose.Schema.Types.ObjectId, required: true },
    created: { type: Date, default: Date.now, index: true }
})

module.exports = mongoose.model('RefillFuel ', schema)