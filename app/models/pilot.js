const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema({
    certification: { type: String, required: true},
    name: { type: String, required: true },
    age: { type: Number, required: true },
    credits: { type: Number, required: true },
    location: { type: mongoose.Schema.Types.ObjectId, required: true }
})

schema.index({ 'certification': 1 },{ unique: true, name: 'certificationUnique' })

module.exports = mongoose.model('Pilots', schema)