const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema({
    name: { type: String, required: true }
})

schema.index({ 'name': 1 }, { unique: true, name: 'nameUnique' })

module.exports = mongoose.model('Locations', schema)