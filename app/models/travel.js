const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema({
    route: { type: mongoose.Schema.Types.ObjectId, required: true },
    pilot: { type: mongoose.Schema.Types.ObjectId, required: true },
    ship: { type: mongoose.Schema.Types.ObjectId, required: true },
    contract: { type: mongoose.Schema.Types.ObjectId, required: true },
})

module.exports = mongoose.model('Travel', schema)