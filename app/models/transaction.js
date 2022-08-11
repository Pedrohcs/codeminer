const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema({
    description: { type: String, required: true},
    value: { type: String, required: true },
    type: { type: String, required: true, enum: ['d', 'c']},
    contract: { type: mongoose.Schema.Types.ObjectId },
    refillFuel: { type: mongoose.Schema.Types.ObjectId },
    created: { type: Date, default: Date.now, index: true }
})

module.exports = mongoose.model('Transactions ', schema)