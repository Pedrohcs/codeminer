const Pilot = require('../models/pilot')

module.exports.create = async function(pilot) {
    try {
        return await Pilot.create(pilot)
    } catch (error) {
        if (error.code === 11000) {
            let keyError = Object.keys(error.keyPattern)
            throw new Error(`There is already a pilot registered with this ${keyError[0]}`)
        }
        else
            throw error
    }
}

module.exports.getByCertification = async function(certification) {
    try {
        return await Pilot.findOne({'certification': certification})
    } catch (error) {
        throw error
    }
}

module.exports.updateById = async function (id, set) {
    try {
        return await Pilot.updateOne({ '_id': id }, { '$set': set })
    } catch(error) {
        throw error
    }
}