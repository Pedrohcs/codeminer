const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema({
    name: { type: String, required: true, enum: ['minerals', 'water', 'food']},
    weight: { type: Schema.Types.Decimal128, required: true }
})

module.exports = mongoose.model('Resources', schema)